const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./path-to-your-firebase-admin-sdk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let bookings = [];
let bookingId = 1;

// Simplified validation middleware
const validateBooking = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('date').isDate().withMessage('Valid date is required'),
  body('time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Time must be in format HH:MM-HH:MM'),
];

// Authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// User endpoints
app.get('/api/users/me', authenticateUser, async (req, res) => {
  try {
    const user = await admin.auth().getUser(req.user.uid);
    res.json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

app.put('/api/users/me', authenticateUser, async (req, res) => {
  try {
    const { displayName, photoURL } = req.body;
    await admin.auth().updateUser(req.user.uid, {
      displayName,
      photoURL
    });
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Protected booking endpoints
app.get('/api/bookings', authenticateUser, (req, res) => {
  // Only return bookings for the authenticated user
  const userBookings = bookings.filter(booking => booking.userId === req.user.uid);
  res.json(userBookings);
});

app.post('/api/bookings', [authenticateUser, validateBooking], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const { name, date, time } = req.body;
  
  const newBooking = {
    id: bookingId++,
    userId: req.user.uid,
    name,
    date,
    time,
    created_at: new Date().toISOString()
  };

  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

// GET single booking
app.get('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  res.json(booking);
});

// PUT update booking
app.put('/api/bookings/:id', validateBooking, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const bookingIndex = bookings.findIndex(b => b.id === parseInt(req.params.id));
  if (bookingIndex === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  const { name, date, time } = req.body;

  // Check for double booking
  const existingBooking = bookings.find(
    b => b.id !== parseInt(req.params.id) && 
        b.date === date && 
        b.time === time
  );

  if (existingBooking) {
    return res.status(400).json({ 
      error: 'This time slot is already booked' 
    });
  }

  // Update booking
  bookings[bookingIndex] = {
    ...bookings[bookingIndex],
    name,
    date,
    time,
    updated_at: new Date().toISOString()
  };

  res.json(bookings[bookingIndex]);
});

// DELETE booking
app.delete('/api/bookings/:id', (req, res) => {
  const bookingIndex = bookings.findIndex(b => b.id === parseInt(req.params.id));
  if (bookingIndex === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  bookings.splice(bookingIndex, 1);
  res.status(204).send();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
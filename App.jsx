import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    date: "",
    time_slot: ""
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      setError("Failed to fetch bookings. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateTimeSlot = (timeSlot) => {
    const timeSlotRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeSlotRegex.test(timeSlot);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validate time slot format
    if (!validateTimeSlot(formData.time_slot)) {
      setError("Please enter time slot in valid format (e.g., 09:00-10:00)");
      return;
    }

    // Validate date is not in the past
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setError("Please select a future date");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post("http://localhost:5000/api/bookings", formData);
      setBookings([...bookings, res.data]);
      setFormData({ user_name: "", email: "", date: "", time_slot: "" });
      setSuccessMessage("Booking created successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Booking System</h1>
      
      {error && <p className="text-red-500 p-2 bg-red-50 rounded mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 p-2 bg-green-50 rounded mb-4">{successMessage}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input 
            type="text" 
            placeholder="Enter your name" 
            required
            className="border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500" 
            value={formData.user_name}
            onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            required
            className="border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input 
            type="date" 
            required
            min={new Date().toISOString().split('T')[0]}
            className="border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
          <input 
            type="text" 
            placeholder="e.g., 09:00-10:00" 
            required
            className="border p-2 w-full rounded focus:ring-blue-500 focus:border-blue-500" 
            value={formData.time_slot}
            onChange={(e) => setFormData({ ...formData, time_slot: e.target.value })}
          />
        </div>

        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating booking..." : "Book"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6 mb-4">Existing Bookings</h2>
      {isLoading ? (
        <p className="text-gray-500">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {bookings.map((booking) => (
            <li key={booking.id} className="py-3">
              <p className="font-medium">{booking.user_name}</p>
              <p className="text-sm text-gray-600">
                Date: {new Date(booking.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">Time: {booking.time_slot}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App; 
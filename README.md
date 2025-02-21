# React + Vite

# NC News - Front End

## Live Demo

💻 https://tommys-nc-news.netlify.app/

## About

NC News is a social news platform. Users can read articles, sort them by different criteria, vote on articles, and participate in discussions through comments. The application features a responsive design and intuitive UI.

## Features

- 📰 Browse articles by topics
- 🔍 Sort articles by date, comments, or votes
- 👆 Vote on articles
- 💬 Read and post comments
- 👤 User authentication
- ✅ Fully responsive design

## Technologies Used

- React
- React Router
- CSS
- Axios
- Deployed on Netlify

## Related Projects

📁 [Back End Repo] (https://github.com/t0mmYch/solo-project)

## Prerequisites

- Node.js (v20.0.0 or higher)
- npm (v9.0.0 or higher)

## Local Development

Follow these steps to run the project locally:

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies ( npm install )
4. Start the development server ( npm run dev )
5. Click on the http://localhost:5173

## API Endpoints

The application interacts with the following endpoints:

- GET `/api/articles` - Get all articles
- GET `/api/articles/:article_id` - Get specific article
- GET `/api/topics` - Get all topics
- GET `/api/articles/:article_id/comments` - Get comments for an article
- POST `/api/articles/:article_id/comments` - Post a new comment
- PATCH `/api/articles/:article_id` - Update article votes
- DELETE `/api/comments/:comment_id` - Delete a comment

* This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
It demonstrates my ability to create full-stack applications using React and Node.js.

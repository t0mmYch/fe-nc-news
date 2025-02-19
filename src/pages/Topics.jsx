import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../utils/axios";
import "../Topics.css";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTopics()
      .then((response) => {
        setTopics(response.data.topics);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Failed to load topics");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading topics...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="topics-container">
      <h2>Topics</h2>
      <div className="topics-grid">
        {topics.map((topic) => (
          <Link
            to={`/topics/${topic.slug}`}
            key={topic.slug}
            className="topic-card"
          >
            <h3>{topic.slug}</h3>
            <p>{topic.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topics;

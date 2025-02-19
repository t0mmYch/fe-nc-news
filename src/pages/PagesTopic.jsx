import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticlesByTopic } from "../utils/axios";
import "../styles/TopicPage.css";

const PagesTopic = () => {
  const { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getArticlesByTopic(topic_slug)
      .then((response) => {
        const filteredArticles = response.data.articles.filter(
            article => article.topic === topic_slug
          );
          if (filteredArticles.length === 0) {
          setError("No articles found for this topic");
        } else {
          setArticles(filteredArticles);
        }
      })
      .catch((err) => {
        console.error('Error fetching articles:', err);
        setError("Failed to load articles. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [topic_slug]);

  if (isLoading) return <p className="loading-message">Loading articles...</p>;

  return (
    <div className="topic-page">
      <header className="topic-header">
        <h2>{topic_slug}</h2>
        <Link to="/topics" className="back-link">
          ← All Topics
        </Link>
      </header>

      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="articles-grid">
          {articles.map((article) => (
            <Link
              to={`/articles/${article.article_id}`}
              key={article.article_id}
              className="article-card"
            >
              <img
                src={article.article_img_url}
                alt=""
                className="article-image"
              />
              <div className="article-content">
                <h3>{article.title}</h3>
                <div className="article-meta">
                  <span>👤 {article.author}</span>
                  <span>💬 {article.comment_count}</span>
                  <span>❤️ {article.votes}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PagesTopic;

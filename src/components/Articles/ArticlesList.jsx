import { useState, useEffect } from 'react';
import axios from 'axios';
import './Articles.css';

export function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get('https://nc-news-api.herokuapp.com/api/articles');
      setArticles(response.data.articles);
    } catch (err) {
      setError('Failed to load articles. Please try again later.');
      console.error('Error fetching articles:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">{error}</p>
        <button 
          onClick={fetchArticles}
          className="retry-button"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="articles-container">
      <h1 className="articles-title">Latest Articles</h1>
      <div className="articles-grid">
        {articles.map((article) => (
          <article key={article.article_id} className="article-card">
            <img 
              src={article.article_img_url} 
              alt={article.title}
              className="article-image"
            />
            <div className="article-content">
              <h2 className="article-title">{article.title}</h2>
              <p className="article-author">By {article.author}</p>
              <div className="article-meta">
                <span>Topic: {article.topic}</span>
                <span>Comments: {article.comment_count}</span>
                <span>Votes: {article.votes}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 
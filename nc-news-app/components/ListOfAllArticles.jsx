import { useState, useEffect } from "react";
import "../src/ListOfAllArticles.css"
import { getArticles } from "../utils/axios";
import { Link } from "react-router-dom";


function ListOfAllArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articleSortedBy, setArticleSortedBy] = useState("created_at");
  const [byOrder, setByOrder] = useState("desc");

  useEffect(() => {
    getArticles(articleSortedBy, byOrder)
        .then((articlesFromApi) => {
            setArticles(articlesFromApi);
            setIsLoading(false);
        })
        .catch((error) => {
            setIsLoading(false);
        });
}, [articleSortedBy, byOrder]);

  if (isLoading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <section className="articles-section">
      <h2>Latest Articles</h2>
      <div className="articles-grid">
        {articles.map((article) => (
          <article key={article.article_id} className="article-card">
            <img
              src={article.article_img_url}
              alt=""
              className="article-image"
            />
            <div className="article-content">
              <h3>{article.title}</h3>
              <div className="article-metadata">
                <span className="topic">{article.topic}</span>
                <span className="author">By {article.author}</span>
              </div>
              <div className="article-stats">
                <span>💬 {article.comment_count}</span>
                <span>❤️ {article.votes}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ListOfAllArticles;

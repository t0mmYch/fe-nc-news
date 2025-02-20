import { useState, useEffect } from "react";
import "../ListOfAllArticles.css";
import { getArticles } from "../utils/axios";
import { Link } from "react-router-dom";
import ArticleSorting from "./ArticleSorting";
import { useSearchParams } from "react-router-dom";
import SortingByButton from "./SortingByButton";

function ListOfAllArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const sort_by = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";

    getArticles(sort_by, order)
      .then((response) => {
        setArticles(response.data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load articles");
        setIsLoading(false);
      });
  }, [searchParams]);

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <section className="articles-section">
      <h2>Latest Articles</h2>
      <SortingByButton />
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
                <span>
                  📅 {new Date(article.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ListOfAllArticles;

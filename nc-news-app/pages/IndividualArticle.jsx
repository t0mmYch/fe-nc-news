import { useState, useEffect } from "react";
import "../src/IndividualArticle.css";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/axios";
import { Link } from "react-router-dom";

const IndividualArticle = () => {
  const [article, setArticle] = useState(null);
 // const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id)
      .then((response) => {
        setArticle(response.data.article);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [article_id]);
  //if (!article) return <p>Article Not Found</p>;
  //if (isLoading) return <p>Loading</p>;
 

  return (
    <div className="single-article">
      <h2>{article.title}</h2>
      <div className="article-info">
        <span>✍️ By {article.author}</span>
        <span>📚 {article.topic}</span>
        <span>📅 {new Date(article.created_at).toLocaleDateString()}</span>
      </div>
      <img
        src={article.article_img_url}
        alt={article.title}
        className="article-full-image"
      />
      <p className="article-body">{article.body}</p>
      <div className="article-stats">
        <span>❤️ {article.votes} votes</span>
        <span>💬 {article.comment_count} comments</span>
      </div>
    </div>
  );
};

export default IndividualArticle;

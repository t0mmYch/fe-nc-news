import { useState, useEffect } from "react";
import "../src/IndividualArticle.css";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/axios";
import { getCommentsByArticleId } from "../utils/axios";
import { Link } from "react-router-dom";
import VoteOnAnArticleButton from "../components/VoteOnAnArticleButton";

const IndividualArticle = () => {
  const [article, setArticle] = useState(null);
 
  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id)
      .then((response) => {
        setArticle(response.data.article);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [article_id]);


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
      <CommentsForGivenArticle article_id={article_id} />
    </div>
  );
};

export default IndividualArticle;

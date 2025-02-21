import { useState, useEffect } from "react";
import "../IndividualArticle.css";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/axios";
import { getCommentsByArticleId } from "../utils/axios";
import { Link } from "react-router-dom";
import VoteOnAnArticleButton from "../components/VoteOnAnArticleButton";
import CommentForGivenArticle from "./CommentForGivenArticle";
import NotFound from "./NotFound";


const IndividualArticle = () => {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getArticleById(article_id)
      .then((response) => {
        setArticle(response.data.article);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            setError({ status: 404, message: "Article Not Found" });
          } else {
            setError({
              status: error.response.status,
              message: error.response.data.msg || "Something Went Wrong",
            });
          }
        } else if (error.request) {
          setError({
            status: 500,
            message: "Unable To Connect",
          });
        } else {
          setError({
            status: 500,
            message: "Something Went Wrong",
          });
        }
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return (
      <div className="single-article">
        <div className="loading-skeleton" style={{height: "40px", marginBottom: "1.5rem"}}></div>
        <div className="article-info">
          {[1,2,3].map(i => (
            <div key={i} className="loading-skeleton" style={{width: "100px", height: "24px"}}></div>
          ))}
        </div>
        <div className="loading-skeleton" style={{height: "400px", marginBottom: "2rem"}}></div>
        <div className="loading-skeleton" style={{height: "200px"}}></div>
      </div>
    );
  }
  if (error) return <NotFound status={error.status} message={error.message} />;
  if (!article) return null;


  
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
      <VoteOnAnArticleButton article={article} />
      <CommentsForGivenArticle article_id={article_id} />
    </div>
  );
};

export default IndividualArticle;

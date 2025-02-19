import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../utils/axios";
import "../styles/Comments.css";
import PostNewComment from "../components/PostNewComment";

const CommentForGivenArticle = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then((response) => {
        setComments(response.data.comments);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading comments...</p>;

  return (
    <section className="comments-section">
      <CommentForm article_id={article_id} onNewComment={handleNewComment} />

      <h3>Comments ({comments.length})</h3>
      {comments.length === 0 ? (
        <p>No Comments</p>
      ) : (
        <div className="comments-list">
          {comments.map((comment) => (
            <article key={comment.comment_id} className="comment-card">
              <div className="comment-header">
                <span className="comment-author">👤 {comment.author}</span>
                <span className="comment-date">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="comment-body">{comment.body}</p>
              <div className="comment-footer">
                <span className="comment-votes">❤️ {comment.votes}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default CommentForGivenArticle;

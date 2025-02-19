import { useState, useEffect } from "react";
import { getCommentsByArticleId, deleteComment } from "../utils/axios";
import "../styles/Comments.css";
import PostNewComment from "../components/PostNewComment";

const CommentForGivenArticle = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingComments, setDeletingComments] = useState(new Set());
  const { loggedInUser } = useContext(UserAccount);

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then((response) => {
        setComments(response.data.comments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [article_id]);

  const handleNewComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  const handleDeleteComment = (comment_id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setDeletingComments((prev) => new Set(prev).add(comment_id));

      deleteComment(comment_id)
        .then(() => {
          setComments(
            comments.filter((comment) => comment.comment_id !== comment_id)
          );
        })
        .catch((error) => {
          console.error("Failed to delete comment:", error);
          alert("Failed to delete comment. Please try again.");
        })
        .finally(() => {
          setDeletingComments((prev) => {
            const newSet = new Set(prev);
            newSet.delete(comment_id);
            return newSet;
          });
        });
    }
  };

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
                {loggedInUser?.username === comment.author && (
                  <button
                    onClick={() => handleDeleteComment(comment.comment_id)}
                    disabled={deletingComments.has(comment.comment_id)}
                    className="delete-button"
                  >
                    {deletingComments.has(comment.comment_id)
                      ? "Deleting..."
                      : "🗑️ Delete"}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default CommentForGivenArticle;

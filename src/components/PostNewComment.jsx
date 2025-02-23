import { useState, useContext } from "react";
import { UserAccount } from "../contexts/UserAccount";
import "../PostNewComment.css";
import { postingComment } from "../utils/axios";

const PostNewComment = ({ article_id, onNewComment }) => {
  const [comment, setComment] = useState("");
  const [subNewComment, setSubNewComment] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { loggedInUser } = useContext(UserAccount);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loggedInUser) {
      setError("To Post A Comment You Need To Log In");
      return;
    }
    if (!comment.trim()) {
      setError("Cannot Be Empty");
      return;
    }

    setSubNewComment(true);
    setSuccessMessage("");
    setError(null);

    postingComment(article_id, {
      username: loggedInUser.username,
      body: comment,
    })
      .then((response) => {
        setComment("");
        setSuccessMessage("Comment Posted Successfully!");
        onNewComment(response.data.comment);
      })
      .catch((err) => {
        setError("Failed To Post Comment. Please Try Again.");
      })
      .finally(() => {
        setSubNewComment(false);
        setTimeout(() => setSuccessMessage(""), 3000);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h3>Add a Comment</h3>
      {!loggedInUser && <p className="login-prompt">Log in to comment</p>}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment here..."
        disabled={!loggedInUser || subNewComment}
        className="comment-input"
        rows="4"
      />
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <button
        type="submit"
        disabled={!loggedInUser || subNewComment || !comment.trim()}
        className="submit-button"
      >
        {subNewComment ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
};

export default PostNewComment;

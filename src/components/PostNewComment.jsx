import { useState, useContext } from "react";
import { UserAccount } from "../contexts/UserAccount";
import CommentForGivenArticle from "../pages/CommentForGivenArticle";
import "../src/PostNewComment.css";

const PostNewComment = () => {
  const [comment, setComment] = useState("");
  const [subNewComment, setSubNewComment] = useState(false);
  const [successfulMessage, setSuccessfulMessage] = useState("");
  const { loggedInUser } = useContext(UserAccount);

  const submitHandle = (e) => {
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

    postComment(article_id, {
      username: loggedInUser.username,
      body: comment,
    })
      .then((response) => {
        setComment("");
        setSuccessfulMessage("Comment Posted Successfully!");
        onNewComment(response.data.comment);
      })
      .catch((err) => {
        setError("Failed To Post Comment. Please Try Again.");
      })
      .finally(() => {
        setSubNewComment(false);
        setTimeout(() => setSuccessfulMessage(""), 3000);
      });
  };

  return (
    <form onSubmit={submitHandle} className="comment-form">
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
      {successfulMessage && (
        <p className="successful-message">{successfulMessage}</p>
      )}
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

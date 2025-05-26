import { useState, useContext } from "react";
import { UserAccount } from "../contexts/UserAccount";
import "../PostNewComment.css";
import { postingComment } from "../utils/axios";
import {Link} from 'react-router-dom'



  const  PostNewComment = ({ article_id, comments, setComments }) => {
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { loggedInUser } = useContext(UserAccount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const postedComment = await postingComment(article_id, {
        username: loggedInUser.username,
        body: newComment
      });
      setComments(currentComments => [
        {
          ...postedComment,
          author: loggedInUser.username,
          created_at: new Date().toISOString()
        },
        ...currentComments
      ]);
      setNewComment('');
      
    } catch (err) {
      setError('Failed to post comment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!loggedInUser) {
    return (
      <div className="comment-section">
        <h2>Comments ({comments.length})</h2>
        <div className="login-prompt">
          Please <Link to="/login" className="login-link">log in</Link> to comment
        </div>
      </div>
    );
  }

  return (
    <div className="comment-section">
      <h2>Comments ({comments.length})</h2>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          disabled={isLoading}
          required
          className={error ? 'error' : ''}
        />
        {error && <div className="error-message">{error}</div>}
        <button
          type="submit"
          className={`submit-button ${isLoading ? 'loading' : ''}`}
          disabled={isLoading || !newComment.trim()}
        >
          {isLoading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
};



export default PostNewComment;

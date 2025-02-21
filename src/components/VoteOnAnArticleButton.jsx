import { useState } from "react";
import { patchArticleVotes } from "../utils/axios";
import "../VoteOnAnArticleButton.css";

const VoteOnAnArticleButton = ({ article }) => {
  const [userVote, setUserVote] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [votes, setVotes] = useState(article.votes);

  const handleTheVote = async(increment) => {
    if (isLoading) return;

    // If clicking the same button again, remove the vote
    if ((increment === 1 && userVote === 1) || (increment === -1 && userVote === -1)) {
      const previousVote = userVote;
      setUserVote(0);
      setVotes(votes - previousVote);
      
      try {
        setIsLoading(true);
        await patchArticleVotes(article.article_id, -previousVote);
      } catch (err) {
        // Revert on error
        setUserVote(previousVote);
        setVotes(votes);
        setError("Failed to update vote. Please try again.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Calculate vote change
    const voteChange = increment - userVote;
    const previousVote = userVote;
    const previousVotes = votes;

    // Optimistically update UI
    setUserVote(increment);
    setVotes(votes + voteChange);
    setError(null);

    try {
      setIsLoading(true);
      await patchArticleVotes(article.article_id, voteChange);
    } catch (err) {
      // Revert on error
      setUserVote(previousVote);
      setVotes(previousVotes);
      setError("Failed to update vote. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vote-container">
      <button
        className={`vote-button ${userVote === 1 ? "voted" : ""}`}
        onClick={() => handleTheVote(1)}
        disabled={isLoading}
        aria-label="Upvote"
      >
        👍 
      </button>
      <span className="vote-count">{article.votes + userVote}</span>
      <button
        className={`vote-button ${userVote === -1 ? "voted" : ""}`}
        onClick={() => handleTheVote(-1)}
        disabled={isLoading}
        aria-label="Downvote"
      >
        👎 
      </button>
      {error && <p className="vote-error">{error}</p>}
    </div>
  );
};

export default VoteOnAnArticleButton;

import { useState } from "react";
import { patchArticleVotes } from "../utils/axios";
import "../src/VoteOnAnArticleButton.css";

const VoteOnAnArticleButton = ({ article_id, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(0);
  const [error, setError] = useState(null);

  const handleTheVote = (voteChange) => {
    if (voteChange === userVote) return;

    const newVoteCount = votes + (voteChange - userVote);
    setVotes(newVoteCount);
    setUserVote(voteChange);
    setError(null);

    patchArticleVotes(article_id, voteChange).catch((err) => {
      setVotes(votes);
      setUserVote(0);
      setError("Failed To Update The Vote");
    });
  };

  return (
    <div className="vote-container">
      <button
        className={`vote-button ${userVote === 1 ? "voted" : ""}`}
        onClick={() => handleTheVote(1)}
        aria-label="Upvote"
      >
        👍
      </button>
      <span className="vote-count">{votes}</span>
      <button
        className={`vote-button ${userVote === -1 ? "voted" : ""}`}
        onClick={() => handleTheVote(-1)}
        aria-label="Downvote"
      >
        👎
      </button>
      {error && <p className="vote-error">{error}</p>}
    </div>
  );
};

export default VoteOnAnArticleButton;

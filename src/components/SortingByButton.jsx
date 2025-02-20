import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../SortingByButton.css";

const SortingByButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSort, setActiveSort] = useState(
    searchParams.get("sort_by") || "created_at"
  );
  const [order, setOrder] = useState(searchParams.get("order") || "desc");

  const handleSort = (sortBy) => {
    const newOrder =
      sortBy === activeSort ? (order === "desc" ? "asc" : "desc") : "desc";

    setActiveSort(sortBy);
    setOrder(newOrder);

    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", sortBy);
    newParams.set("order", newOrder);
    setSearchParams(newParams);
  };

  const getButtonClass = (sortBy) => {
    return `sort-button ${activeSort === sortBy ? "active" : ""} ${
      activeSort === sortBy ? order : ""
    }`;
  };

  return (
    <div className="sort-container">
      <h3>Sort Articles By:</h3>
      <div className="sort-buttons">
        <button
          className={getButtonClass("created_at")}
          onClick={() => handleSort("created_at")}
        >
          Date {activeSort === "created_at" && (order === "desc" ? "↓" : "↑")}
        </button>

        <button
          className={getButtonClass("comment_count")}
          onClick={() => handleSort("comment_count")}
        >
          Comments{" "}
          {activeSort === "comment_count" && (order === "desc" ? "↓" : "↑")}
        </button>

        <button
          className={getButtonClass("votes")}
          onClick={() => handleSort("votes")}
        >
          Votes {activeSort === "votes" && (order === "desc" ? "↓" : "↑")}
        </button>
      </div>
    </div>
  );
};

export default SortingByButton;

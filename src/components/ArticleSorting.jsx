import { useSearchParams } from "react-router-dom";
import "../ArticleSorting.css";

const ArticleSorting = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", e.target.value);
    setSearchParams(newParams);
  };

  const handleOrderChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", e.target.value);
    setSearchParams(newParams);
  };

  return (
    <div className="sort-controls">
      <div className="sort-group">
        <label htmlFor="sort-by">Sort by:</label>
        <select
          id="sort-by"
          value={searchParams.get("sort_by") || "created_at"}
          onChange={handleSortChange}
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>
      </div>

      <div className="sort-group">
        <label htmlFor="order">Order:</label>
        <select
          id="order"
          value={searchParams.get("order") || "desc"}
          onChange={handleOrderChange}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
};

export default ArticleSorting;

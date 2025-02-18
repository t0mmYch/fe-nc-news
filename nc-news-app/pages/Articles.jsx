import "../src/App.css";

function Articles({ article }) {
  return (
    <article className="article-card">
      <img src={article.ar} alt="" className="article-image" />
      <div className="article-content">
        <h3>{article.title}</h3>
        <p className="article-topic">Topic: {article.topic}</p>
        <div className="article-meta">
          <span>👤 {article.author}</span>
          <span>💬 {article.comment_count}</span>
          <span>👍 {article.votes}</span>
        </div>
      </div>
    </article>
  );
}

export default Articles;

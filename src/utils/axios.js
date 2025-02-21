import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://solo-project-4fr3.onrender.com/api",
});
export const getArticles = (
  sort_by = "created_at",
  order = "desc",
  topic_slug
) => {
  return newsApi.get("/articles/", {
    params: {
      sort_by,
      order,
      topic_slug,
    },
  });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`);
};

export const getCommentsByArticleId = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`).catch((error) => {
    if (error.response) {
      throw new Error(error.response.data.msg || "Failed to load comments");
    } else if (error.request) {
      throw new Error("Network error");
    } else {
      throw new Error("Error setting up request");
    }
  });
};

export const patchArticleVotes = (article_id, increment) => {
  if (!article_id) {
    return Promise.reject(new Error('Article ID is required'));
  }
  return newsApi.patch(`/articles/${article_id}`, {
    inc_votes: increment
  });
};

export const postingComment = (article_id, dataComment) => {
  return newsApi.post(`/articles/${article_id}/comments`, dataComment);
};

export const deleteComment = (comment_id) => {
  return newsApi.delete(`/comments/${comment_id}`);
};

export const getTopics = () => {
  return newsApi.get("/topics");
};

export const getArticlesByTopic = (topic_slug) => {
  return newsApi.get("/articles", {
    params: {
      topic: topic_slug,
    },
  });
};

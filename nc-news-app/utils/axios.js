import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://solo-project-4fr3.onrender.com/api",
});
export const getArticles = (sort_by, order) => {
  return newsApi
    .get("/articles", {
      params: {
        sort_by,
        order,
      },
    })
    .then((response) => {
      return response.data.articles;
    });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`);
};

export const getCommentsByArticleId = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`);
};

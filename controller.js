const  endpoints  = require("./endpoints.json");
const { selectTopics, selectArticleById, selectArticles, selectCommentByArticleId} = require("../be-nc-news/model");

exports.getEndPoints = (req, res, next) => {
  //  console.log(endpoints);
    
  res.status(200).send({ endpoints });
};

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
        next(err)
});
}

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next)
};



exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next)
};

exports.getCommentForGivenArticle = (req, res, next) => {
    const { article_id } = req.params
  
    selectCommentByArticleId(article_id)
    .then((comments)=>{
        res.status(200).send({ comments });
    })
    .catch(next)
}
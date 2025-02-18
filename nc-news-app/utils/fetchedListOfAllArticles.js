import api from "./axios";


function fetchedListOfAllArticles() {
    return api('articles')
        .then(({ response }) => {
            return response
        })
}


export default fetchedListOfAllArticles
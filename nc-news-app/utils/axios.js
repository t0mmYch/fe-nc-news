import axios from 'axios'

const api = axios.create({
    baseURL: 'https://solo-project-4fr3.onrender.com/api'
})
export const getArticles = (sort_by, order) => {
    return newsApi.get('/articles', {
        params: {
            sort_by,
            order
        }
    });
};

export default api
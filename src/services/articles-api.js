import axios from 'axios'

export const fetchArticles = async (articlesName, page) => {
  const BASE_URL = 'https://pixabay.com/api'
  const API_KEY = '21672899-2a5ee6aa4aab0c8363895dd3b'

  const response = await axios.get(
    `${BASE_URL}/?key=${API_KEY}&q=${articlesName}&image_type=photo&page&per_page=12&page=${page}`,
  )
  const hits = await response.data.hits

  return hits
}
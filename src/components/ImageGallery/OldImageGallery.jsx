import { Component } from 'react'
import { GalleryLoader } from '../Loader/Loader'
import PropTypes from 'prop-types'
import s from './ImageGallery.module.css'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import { fetchArticles } from '../../services/articles-api'
import Button from '../Button/Button'
import { onErrorToast } from '../ToastError'
import imgSearch from '../Images/Search.jpg'
import imgError from '../Images/error.jpg'

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

class ImageGallery extends Component {
  state = {
    articles: [],
    error: null,
    status: Status.IDLE,
    page: 1,
  }

  onLoadMoreBtn = (e) => {
    e.preventDefault()
    setTimeout(() => {
      this.onFetchArticles()
    }, 500)
    this.scrollPageToEnd()
  }

  onFetchArticles() {
    const name = this.props.articlesName

    const { page } = this.state
    fetchArticles(name, page)
      .then((articles) => {
        if (articles.hits.length === 0) {
          onErrorToast()
        }

        return this.setState((prevState) => ({
          articles: [...prevState.articles, ...articles.hits],
          page: this.state.page + 1,
          status: Status.RESOLVED,
        }))
      })

      .catch((error) => this.setState({ error, status: Status.REJECTED }))
  }

  scrollPageToEnd = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }, 1000)
  }
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.articlesName
    const nextName = this.props.articlesName

    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING, page: 1, articles: [] })
      setTimeout(() => {
        this.onFetchArticles()
      }, 500)
    }
  }

  render() {
    const { articles, error, status } = this.state

    if (status === Status.IDLE) {
      return (
        <>
          <h1 className={s.descriptionText}> Введите Ваш запрос &#128269;</h1>
          <img src={imgSearch} width="700" alt="search" className={s.image} />
        </>
      )
    }
    if (status === Status.PENDING) {
      return <GalleryLoader />
    }
    if (status === Status.REJECTED) {
      return (
        <>
        <h1>{error.message}</h1>
        <img src={imgError} width="700" alt="error" className={s.image} />
      </>
      )
    }

    if (status === Status.RESOLVED) {
      return (
        <>
          <ul className={s.ImageGallery}>
            {articles.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                handleImageClick={this.props.handleImageClick}
              />
            ))}
          </ul>
          {articles.length > 0 && (
            <Button onClick={this.onLoadMoreBtn} aria-label="add contact" />
          )}
        </>
      )
    }
  }
}

ImageGallery.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
  handleImageClick: PropTypes.func,
  page: PropTypes.number,
}

export default ImageGallery
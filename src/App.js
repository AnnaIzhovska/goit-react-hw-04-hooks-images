import { useState, useEffect } from 'react'
// import {useLockBodyScroll} from 'react-use';
import PropTypes from 'prop-types'
import s from'./App.module.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { GalleryLoader, ModalLoader } from './components/Loader/Loader'
import Button from './components/Button/Button'
import { onErrorToast } from './components/ToastError'
import Modal from './components/Modal/Modal'
import Container from './components/Container/Container'
import Searchbar  from './components/Searchbar/Searchbar'
import  ImageGallery  from './components/ImageGallery/ImageGallery'
import imgSearch from './components/Images/Search.jpg'
import imgError from './components/Images/error.jpg'
import { fetchArticles } from './services/articles-api'

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

export default function App() {
    const [articlesName, setArticlesName] = useState('')
    const [articles, setArticles] = useState([])
    const [status, setStatus] = useState(Status.IDLE)
    const [page, setPage] = useState(1)
    const [largeImageURL, setLargeImageURL] = useState(null)
    const [imgTags, setImgTags] = useState('')
    const [loader, setLoader] = useState(false)

    function onModalClose() {
      setLargeImageURL(null)
    }

    function hideLoaderInModal() {
      setLoader(false)
    }
    
    function handleImageClick(largeImageURL, imgTags) {
      setLargeImageURL(largeImageURL)
      setImgTags(imgTags)
      setLoader(true)
    }
    
    function handleFormSubmit(articlesName) {
    if (articlesName.trim() === '') {
      onErrorToast()
      return
        }
        
      resetState()
      setArticlesName(articlesName)
    }

    function resetState() {
      setArticlesName(null)
      setPage(1)
      setArticles([])
    }
    
    function onLoadMoreBtn() {
      setPage((page) => page + 1)
    }
  
    useEffect(() => {
    if (!articlesName) {
      return
    }
    setStatus(Status.PENDING)

    async function onFetchArticles() {
      try {
        const articles = await fetchArticles(articlesName, page)

        if (articles.length === 0) {
          throw new Error()
        }

        setArticles((state) => [...state,...articles])
        setStatus(Status.RESOLVED)
      } catch (error) {
        setStatus(Status.REJECTED)
        onErrorToast()
      }
    }
      onFetchArticles()
    }, [page, articlesName])
  
   useEffect(() => {
    function scrollPageToEnd() {
      setTimeout(() => {
        window.scrollBy({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        })
      }, 1000)
    }

    if (page > 1) {
      scrollPageToEnd()
    }
  }, [articles, page])


  const showImageList = articles.length > 0

    return (
      <Container>
        <Searchbar onSearch={handleFormSubmit} />
        {status === Status.IDLE && (
          <>
        <h1 className={s.descriptionText}> Введите Ваш запрос &#128269;</h1>
        <img src={imgSearch} width="700" alt="search" className={s.image}/>
          </>
        )}

        {status === Status.PENDING && <GalleryLoader />}
        
        {status === Status.RESOLVED && (
          <ImageGallery articles={articles} handleImageClick={handleImageClick} />)}
        
        {showImageList && (<Button onClick={onLoadMoreBtn} aria-label="add contact" />)}

        {status === Status.REJECTED && (
          <>
            <img src={imgError} width="700" alt="error" className={s.image} />
          </>
        )}
        {largeImageURL && (
          <Modal onClose={onModalClose}>
            {loader && <ModalLoader />}
            <img
              src={largeImageURL}
              alt={imgTags}
              onLoad={hideLoaderInModal}
            />
          </Modal>
        )}

        <ToastContainer autoClose={4000} />
      </Container>
    )
  }

App.propTypes = {
  isShow: PropTypes.bool,
  articlesName: PropTypes.string,
  loader: PropTypes.bool,
}

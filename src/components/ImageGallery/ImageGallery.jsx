import PropTypes from 'prop-types'
import s from './ImageGallery.module.css'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'

const ImageGallery = ({articles, handleImageClick}) => {
    return (
        <ul className={s.ImageGallery}>
          {articles.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
              handleImageClick={handleImageClick}
            />
          ))}
            </ul>
        )}

ImageGallery.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ).isRequired,

  handleImageClick: PropTypes.func.isRequired,
}

export default ImageGallery
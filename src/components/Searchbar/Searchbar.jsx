import s from './Searchbar.module.css'

const Searchbar = ({ onSearch }) => {

    const handleSearch = (e) => {
    e.preventDefault()
     onSearch (e.target.elements.articlesName.value)
      e.target.elements.articlesName.value = ' '
    }
  
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSearch}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            name="articlesName"
            placeholder="Поиск картинок и фото"
          />
        </form>
      </header>
    )
  }

export default Searchbar

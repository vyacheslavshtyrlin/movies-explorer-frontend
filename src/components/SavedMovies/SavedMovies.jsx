import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';

export default function Movies() {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList  />
    </main>
  )
}

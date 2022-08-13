import "./App.css";

import { Route, Switch, useHistory } from "react-router-dom";
import moviesTest from "../../utils/moviesTest";
import { useState, useEffect } from "react";
import Movies from "../Movies/Movies.jsx";
import SavedMovies from "../Movies/Movies.jsx";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import Profile from "../Profile/Profile.jsx";
import Header from "../Header/Header";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import NotFound from "../NotFound/NotFound.jsx";

export default function App() {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [authorized, setAuthorized] = useState(true);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    setMovies(moviesTest);
  }, []);

  useEffect(() => {
    setSavedMovies(
      moviesTest.filter((movie) => {
        return movie.saved;
      })
    );
  }, []);

  function onClickMenu(menuOpen) {
    setMenuOpen(!menuOpen);
  }

  function goBack() {
    history.goBack();
  }

  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Header authorized={true} onClickMenu={onClickMenu} menuOpen={menuOpen}  />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Header authorized={authorized} onClickMenu={onClickMenu} menuOpen={menuOpen}  />
          <Movies movies={movies} />
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
          <Header authorized={authorized} onClickMenu={onClickMenu} menuOpen={menuOpen}  />
          <SavedMovies movies={savedMovies} />
          <Footer />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route exact path="/profile">
          <Header authorized={authorized} onClickMenu={onClickMenu} menuOpen={menuOpen} />
          <Profile />
        </Route>
        <Route path="*">
          <NotFound goBack={goBack} />
        </Route>
      </Switch>
    </div>
  );
}

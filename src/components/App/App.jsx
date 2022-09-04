import "./App.css";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { currentUserContext } from "../../context/CurrentUserContext";
import React, { useState, useEffect } from "react";
import Movies from "../Movies/Movies.jsx";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import Profile from "../Profile/Profile.jsx";
import Header from "../Header/Header";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import InfoTooltip from "../InfoToolTip/InfoToolTip";
import MainApi from "../../utils/MainApi";
import Auth from "../../utils/Auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Preloader from "../Preloader/Preloader";
import { MAIN_URL, headerPatchs } from "../../utils/constants";

export default function App() {
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [preloader, setPreloader] = useState(false);
  const [open, isOpen] = useState(false);
  const [message, setMessage] = useState({
    isError: true,
    message: "Произошла ошибка",
  });
  const mainApi = new MainApi(
    MAIN_URL,
    `Bearer ${localStorage.getItem("jwt")}`
  );

  const auth = new Auth(MAIN_URL);

  useEffect(() => {
    if (authorized) {
      Promise.all([mainApi.getUser(), mainApi.getMovie()])
        .then((data) => {
          const [userData, moviesData] = data;
          setCurrentUser(userData);
          setSavedMovies(moviesData);
        })
        .catch((error) => {
          isOpen(true);
          setMessage({
            isError: true,
            message: `${error}`,
          });
        });
    }
  }, [authorized]);

  function handleClose() {
    isOpen(false);
    setMessage("");
  }
  function onClickMenu(menuOpen) {
    setMenuOpen(!menuOpen);
  }

  function goBack() {
    history.goBack();
  }

  const handleRegistration = (data) => {
    console.log(data);
    auth
      .createUser(data)
      .then(() => {
        setPreloader(true);
        handleLogin(data);
      })
      .catch((error) => {
        isOpen(true);
        setMessage({
          isError: true,
          message: `${error}`,
        });
      })
      .finally(() => setTimeout(() => setPreloader(false), 500));
  };

  const handleLogin = (data) => {
    auth
      .login(data)
      .then((res) => {
        if (res.token) {
          setPreloader(true);
          localStorage.setItem("jwt", res.token);
          handleCheckToken();
        } else {
          setMessage({
            isError: true,
            message: "Произошла ошибка",
          });
        }
      })
      .catch((error) => {
        isOpen(true);
        setMessage({
          isError: true,
          message: `${error}`,
        });
      })
      .finally(() => setTimeout(() => setPreloader(false), 500));
  };

  useEffect(() => {
    handleCheckToken();
  }, []);

  const handleCheckToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setAuthorized(true);
      history.push("/movies");
    }
  };

  const handleSaveMovie = (data) => {
    mainApi
      .createMovie(data)
      .then((res) => {
        setSavedMovies([res, ...savedMovies]);
      })
      .catch((error) => {
        isOpen(true);
        setMessage({
          isError: true,
          message: `${error}`,
        });
      });
  };

  const handleDeleteMovie = (data) => {
    const findMovie = savedMovies.find(
      (item) => item._id === data._id || item.movieId === data.movieId
    );
    mainApi
      .deleteMovie(findMovie)
      .then((movie) => {
        const updateState = savedMovies.filter(
          (item) => item._id !== movie.data._id
        );
        setSavedMovies(updateState);
      })
      .catch((error) => {
        isOpen(true);
        setMessage({
          isError: true,
          message: `${error}`,
        });
      });
  };

  const handleEditProfile = (data) => {
    mainApi
      .patchUser(data)
      .then((data) => {
        setCurrentUser({
          user: {
            email: data.email,
            name: data.name,
          },
        });
        isOpen(true);
        setMessage({
          isError: false,
          message: `Профиль обновлен`,
        });
      })
      .catch((error) => {
        isOpen(true);
        setMessage({
          isError: true,
          message: `${error}`,
        });
      })
      .finally(() => setTimeout(() => isOpen(false), 1000));
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
    setAuthorized(false);
    setCurrentUser({});
    setSavedMovies([]);
  };

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="app">
        <Route exact path={headerPatchs}>
          <Header
            authorized={authorized}
            onClickMenu={onClickMenu}
            menuOpen={menuOpen}
          />
        </Route>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/signup">
            {!authorized ? (
              <Register onRegister={handleRegistration} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/signin">
            {!authorized ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <ProtectedRoute path="/movies" authorized={authorized}>
            <Movies
              isOpen={isOpen}
              setMessage={setMessage}
              onDelete={handleDeleteMovie}
              onSave={handleSaveMovie}
              savedMovies={savedMovies}
              movies={movies}
              setPreloader={setPreloader}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" authorized={authorized}>
            <SavedMovies movies={savedMovies} onDelete={handleDeleteMovie} />
          </ProtectedRoute>
          <ProtectedRoute authorized={authorized} patch="/profile">
            <Profile onExit={handleLogout} onEdit={handleEditProfile} />
          </ProtectedRoute>
        </Switch>
        <Route path="*">
          <NotFound goBack={goBack} />
        </Route>
        <Route exact path={headerPatchs}>
          <Footer />
        </Route>
        <Preloader isOpen={preloader}></Preloader>
        <InfoTooltip
          onClose={handleClose}
          onMessage={message}
          isOpen={open}
        ></InfoTooltip>
      </div>
    </currentUserContext.Provider>
  );
}

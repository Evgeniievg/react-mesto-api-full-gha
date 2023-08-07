import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import '../index.css';
import { Header } from './Header';
import Main from './Main';
import api from '../utils/api';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function App() {

  const [currentUser , setСurrentUser ] = useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedCard, setselectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const [authData, setAuthData] = useState(false);
  const [popupAuthText, setPopupAuthText] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;

  useEffect(() => {
    if(isLoggedIn) {
      api.getUserInfo()
      .then((userInfo) => {
        setСurrentUser(userInfo)
      })
      .catch((error) => {
        console.log('Ошибка при загрузке данных пользователя:', error);
      });
    api.fetchCards(cards).then((data) => {
      setCards(data)
      }).catch((error) => {
         console.log('Ошибка при загрузке карточек:', error);
       });
    }

  }, [isLoggedIn]);

  const [cards, setCards] = useState([])

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
    }).catch((error) => console.error(`Ошибка при клике на лайк : ${error}`))
}

  function handleCardDelete(card){
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id))
      closeAllPopups();
    }).catch(error => {
      console.log('Ошибка при удалении карточки:', error);
  });
}

  function handleUpdateUser({name, about}) {
    api.changeProfile({name, about})
      .then(newInfo => {
        setСurrentUser(newInfo);
        closeAllPopups();
    })
      .catch(error => {
        console.log('Ошибка при обновлении данных пользователя:', error);
    });
}

  function handleUpdateAvatar(avatar){
    api.changeAvatar(avatar)
    .then(data => {
      setСurrentUser(data);
      closeAllPopups();
    })
    .catch(error => {
      console.log('Ошибка при обновлении аватара:', error);
  });
}

  function handleAddPlaceSubmit({name, link}){
    api.createCard({name, link}).then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(error => {
      console.log('Ошибка при добавлении карточки:', error);
  });
}

  function handleCardClick(card) {
    setselectedCard(card);
}

function handleDeleteIconClick(card) {
  setDeletedCard(card);
}

  function checkToken() {
    auth.getContent()
    .then((data) => {
      if(!data) {
        return;
      }
      setLoggedIn(true)
      navigate('/')
      setEmail(data.email)
    })
    .catch(error => {
      console.log('Ошибка при проверке токена:', error);
  });
}

  function handleSignOut() {
    navigate('/sign-in');
    setLoggedIn(false)
  }

  const handleLogin = (email, password) => {
    auth.authorize(email, password).then(() => {
      setLoggedIn(true)
      navigate('/')
    }).catch((error) => {
      setAuthData(false)
      setPopupAuthText('Что-то пошло не так! Попробуйте еще раз.')
      handleAuth()
      console.log('Произошла ошибка при входе:', error);
  });
}

  const handleRegister = (email, password) => {
    handleAuth()
    auth.register(email, password).then(() => {
      setAuthData(true)
      setPopupAuthText("Вы успешно зарегистрировались!")
      navigate('/sign-in')
    }).catch((error) => {
      setAuthData(false)
      setPopupAuthText('Что-то пошло не так! Попробуйте еще раз.')
      console.log('Произошла ошибка при регистрации:', error);
  });
  }

  React.useEffect(() => {
    if (currentUrl === '/') {
      checkToken();
    }
}, [currentUrl])

  function handleCloseByOverlay(evt) {
    if(evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
}

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
}

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
}

  function handleDeleteCardClick() {
    setConfirmDeleteOpen(true)
  }

  function handleAuth() {
    setInfoTooltip(true);
}

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoTooltip(false);
    setselectedCard(null);
    setConfirmDeleteOpen(false);
};

  return (
      <CurrentUserContext.Provider value={ currentUser }>
        <div className="page">

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
            onOverlayClick={handleCloseByOverlay}
          />

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onOverlayClick={handleCloseByOverlay}
          />

          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onOverlayClick={handleCloseByOverlay}
          />

          <ImagePopup
            onOpenPopupWithImage={handleCardClick}
            onClose={closeAllPopups}
            isOpen={selectedCard}
            onOverlayClick={handleCloseByOverlay}
          />

          <PopupWithForm
            onClose={closeAllPopups}
            onOverlayClick={handleCloseByOverlay}
          />

          <ConfirmDeletePopup
            onClose={closeAllPopups}
            isOpen={isConfirmDeleteOpen}
            deletedCard={deletedCard}
            onCardDelete={handleCardDelete}
            onOverlayClick={handleCloseByOverlay}
          />

          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltip}
            authData={authData}
            popupAuthText={popupAuthText}
            onOverlayClick={handleCloseByOverlay}
          />

          <div className="page__wrapper">
            <Header email={email} isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />

              <Routes>
                <Route path='*' element={ isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
                <Route exact path="/"
                element={ <ProtectedRoute
                element={Main}
                cards={cards}
                isLoggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onDeleteCardPopup={handleDeleteCardClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onDeleteIconClick={handleDeleteIconClick}
                onCardLike={handleCardLike}
                 /> } />

                <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
                <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
              </Routes>

            <Footer />

          </div>
        </div>
      </ CurrentUserContext.Provider>

  );
}

export default App;

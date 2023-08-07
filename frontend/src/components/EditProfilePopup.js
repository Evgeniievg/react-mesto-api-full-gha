import React, {useState, useEffect} from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if(currentUser) {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
    }

}, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
}

  function handleChangeDescription(e) {
    setDescription(e.target.value);
}

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  if (!currentUser) {
    return null;
}

  return (
    <>
      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        isOpen={props.isOpen}
        onSubmit={handleSubmit}
        onClose={props.onClose}
        onOverlayClick={props.onOverlayClick}
        >
            <input
              type="text"
              onChange={handleChangeName}
              placeholder="Имя"
              id="name-input"
              value={name}
              className="popup-edit__input popup-edit__input_type_title popup__input popup__input_type_title"
              name="name"
              required minLength="2"
              maxLength="40" />
            <span className="popup__input-error name-input-error"></span>
            <input
              type="text"
              placeholder="О себе"
              onChange={handleChangeDescription}
              id="about-input"
              value={description}
              className="popup-edit__input popup-edit__input_type_about popup__input popup__input_type_about"
              name="about"
              required minLength="2"
              maxLength="200" />
            <span className="popup__input-error about-input-error"></span>
      </PopupWithForm>
    </>
  )
}

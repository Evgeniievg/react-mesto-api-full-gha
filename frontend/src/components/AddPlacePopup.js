import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup(props) {

  React.useEffect(() => {
    newCardTitleRef.current.value = '';
    newCardLinkRef.current.value = '';
  }, [props.isOpen]);

  const newCardTitleRef = React.useRef('');
  const newCardLinkRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    const newCardTitle = newCardTitleRef.current.value;
    const newCardLink = newCardLinkRef.current.value;

    props.onAddPlace({
      name: newCardTitle,
      link: newCardLink,
    });
  }

  return (
      <PopupWithForm
        name="element"
        title="Новое место"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        onOverlayClick={props.onOverlayClick}
        >
            <input
              type="text"
              id="title-input"
              className="popup-element__input popup-element__input_type_title popup__input popup__input_type_title"
              name="name"
              ref={newCardTitleRef}
              placeholder="Название"
              required minLength="2"
              maxLength="30" />
            <span className="popup__input-error name-input-error"></span>
            <input
              id="link-input"
              ref={newCardLinkRef}
              className="popup-element__input popup-element__input_type_description popup__input popup__input_type_description"
              name="link" placeholder="Ссылка на картинку"
              required type="url" />
            <span className="popup__input-error link-input-error"></span>
      </PopupWithForm>
  )
}

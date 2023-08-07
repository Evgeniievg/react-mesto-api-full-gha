import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    const avatarValue = avatarRef.current.value;

    props.onUpdateAvatar({
      avatar: avatarValue,
    });

    avatarRef.current.value = '';
  }

  return (
    <div>
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={props.isOpen}
        onSubmit={handleSubmit}
        onClose={props.onClose}
        onOverlayClick={props.onOverlayClick}
        >
              <input
               ref={avatarRef}
                placeholder="Ссылка на картинку"
                name="link"
                required type="url"
                className="popup__input popup-avatar__input" />
              <span className="popup__input-error link-input-error"></span>
      </PopupWithForm>
    </div>
  )
}

import React from 'react';
import PopupWithForm from './PopupWithForm'

const ConfirmDeletePopup = (props) => {

  function handleSubmit(e) {
    e.preventDefault()
    props.onCardDelete(props.deletedCard)
  }

  return (
    <PopupWithForm
        name="delete"
        title="Вы уверены?"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        onOverlayClick={props.onOverlayClick}
        />
  )
}

export  default  ConfirmDeletePopup;

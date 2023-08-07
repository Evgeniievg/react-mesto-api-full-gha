import React from 'react'
import useCloseByEscape from '../utils/useCloseByEscape.js';

function PopupWithForm(props) {
  useCloseByEscape(props.isOpen, props.onClose)

  return (
    <div onClick={props.onOverlayClick} className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`} >
      <div className={`popup-${props.name}__container popup__container`}>
        <button className={`popup-${props.name}__close popup__close`} onClick={props.onClose} type="button" aria-label="Закрыть"></button>
        <h3 className={`popup-${props.name}__title popup__title`}>{props.title}</h3>
        <form onSubmit={props.onSubmit} className={`popup-${props.name}__form popup__form`} name={props.name}>
        {props.children}
          <button  className={`popup-${props.name}__button popup__button`} type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm

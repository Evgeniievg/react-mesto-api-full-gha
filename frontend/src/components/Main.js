import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main className="main">
        <section className="profile">
          <div className="profile__user">
            <div className="profile__avatar-container" onClick={props.onEditAvatar}>
              <img alt='Фотография профиля' className="profile__avatar" src={currentUser.avatar} />
            </div>
            <div className="profile__info">
              <div className="profile__texts">
                <h1 className="profile__title">{currentUser.name}</h1>
                <p className="profile__about">{currentUser.about}</p>
              </div>
              <button className="profile__edit" onClick={props.onEditProfile} type="button" aria-label="Редактировать"></button>
            </div>
          </div>
          <button className="profile__button" onClick={props.onAddPlace} type="button" aria-label="Добавить"></button>
        </section>
        <section className="elements">
          {props.cards.map((card) => (
            <Card key={card._id} likesAmount={card.likes.length} card={card} onDeleteCardPopup={props.onDeleteCardPopup} onLikeClick={props.onCardLike} onOpenPopupWithImage={props.onCardClick} onDeleteIconClick={props.onDeleteIconClick} />
      ))}
        </section>
      </main>
    </>
  );
}

export default Main;

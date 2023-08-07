import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login( { onLogin }) {

  const navigate = useNavigate()

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
})

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
  });
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    onLogin(email, password)

}

  return (
    <main className='auth'>
      <h2 className='auth__title'>Вход</h2>
      <form onSubmit={handleSubmit} className='auth__form'>
        <input className='auth__input'
          id="email"
          name="email"
          type="email"
          value={formValue.email}
          placeholder='Email'
          onChange={handleChange}
        />
        <input className='auth__input'
          type='password'
          id="password"
          name="password"
          value={formValue.password}
          placeholder='Пароль'
          onChange={handleChange}
        />
        <button onSubmit={handleSubmit} className='auth__button'>Войти</button>
      </form>
    </main>
  )
}

export const BASE_URL = "https://api.project-mesto.nomoreparties.co"

const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const register = (email, password) => {

  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({email, password})
  }).then(handleServerResponse)
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({email, password})
  }).then(handleServerResponse)
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      },
    credentials: "include",
 }).then(handleServerResponse)
}

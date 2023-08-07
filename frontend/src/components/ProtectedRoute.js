import * as React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ isLoggedIn, element: Component, ...props}) {
  return (
    isLoggedIn ? <Component {...props} /> : <Navigate to="sign-in" replace />
  )
}

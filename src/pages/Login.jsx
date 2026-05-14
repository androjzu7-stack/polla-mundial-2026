import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/auth/LoginForm'

export function Login({ onLogin }) {
  const navigate = useNavigate()

  const handleLogin = async (email, password) => {
    await onLogin(email, password)
    navigate('/')
  }

  return <LoginForm onLogin={handleLogin} />
}

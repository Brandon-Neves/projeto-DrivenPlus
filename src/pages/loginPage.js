import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import styled from 'styled-components'
import { useContext, useState } from 'react'
import StyledLink from '../components/StyledLink'
import StyledButton from '../components/StyledButton'
import StyledInput from '../components/StyledInput'
import AuthContext from '../contexts/AuthContext'
import UserContext from '../contexts/UserContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setToken } = useContext(AuthContext)
  const { setUser } = useContext(UserContext)

  function handleSubmit(e) {
    e.preventDefault()
    const body = { email: email, password: password }

    const promise = api.login(body)
    promise.then(res => {
      setUser({
        id: res.data.id,
        name: res.data.name,
        cpf: res.data.cpf,
        password: res.data.password,
        membership: res.data.membership
      })
      setToken(res.data.token)
      res.data.membership === null
        ? navigate('/subscriptions')
        : navigate('/home')
    })
    promise.catch(() => {
      alert('Erro, senha ou usário incorreto ou não cadastrado')
    })
  }

  return (
    <LoginPage>
      <h1>
        DRIVEN PLUS <span>+</span>
      </h1>
      <form onSubmit={handleSubmit} action="">
        <StyledInput
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <StyledInput
          type="password"
          value={password}
          placeholder="Senha"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <StyledButton type="submit">Entrar</StyledButton>
      </form>
      <StyledLink to="/sign-up">Não possuí uma conta? Cadastre-se</StyledLink>
    </LoginPage>
  )
}

const LoginPage = styled.div`
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 100px auto;
  h1 {
    display: flex;
    color: #f5f5f5;
    font-size: 40px;
    align-items: center;
    span {
      color: #ff4791;
      font-size: 70px;
      margin-left: 8px;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    width: 300px;
    font-size: 14px;
  }
`

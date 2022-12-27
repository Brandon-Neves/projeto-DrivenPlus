import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import styled from 'styled-components'
import AuthContext from '../contexts/AuthContext'
import axios from 'axios'
import avatar from '../assets/avatar.png'

export default function UserArea() {
  const { user } = useContext(UserContext)
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

  function changePlan() {
    navigate('/subscriptions')
  }

  function cancelPlan() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const promise = axios.delete(
      'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions',
      config
    )
    promise.then(() => {
      navigate('/subscriptions')
    })
    promise.catch(() => {
      return alert(
        'Não foi possível cancelar o seu plano, tente novamente mais tarde'
      )
    })
  }

  return (
    <Container>
      <Header>
        <img src={user.membership.image} alt="" />
        <Avatar>
          <img src={avatar} alt="" />
        </Avatar>
      </Header>
      <h1>Olá, {user.name}</h1>
      {user.membership.perks !== undefined
        ? user.membership.perks.map(p => (
            <ContainerLinks>
              <StyledLink target={'_blank'} href={p.link} key={p.id}>
                {p.title}
              </StyledLink>
            </ContainerLinks>
          ))
        : ''}
      <ContainerButton>
        <button onClick={changePlan}>Mudar plano</button>
        <button onClick={cancelPlan}>Cancelar plano</button>
      </ContainerButton>
    </Container>
  )
}
const Container = styled.div`
  color: #fff;
  width: 350px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  h1 {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    margin: 40px 0 50px 0;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 34px;
  img {
    width: 20%;
  }
`
const Avatar = styled.div`
  img {
    width: 100%;
  }
`

const ContainerLinks = styled.div`
  display: flex;
  justify-content: center;
`
const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 100%;
  margin-bottom: 8px;
  border-radius: 8px;
  height: 52px;
  font-weight: 700px;
  color: #fff;
  background-color: #ff4791;
`

const ContainerButton = styled.div`
  position: absolute;
  bottom: 0;
  width: 350px;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    width: 100%;
    margin: 0 auto 8px auto;
    border-radius: 8px;
    height: 52px;
    font-weight: 700px;
    color: #fff;
    cursor: pointer;
    :first-child {
      background-color: #ff4791;
    }
    :last-child {
      background-color: #ff4747;
      margin-bottom: 25px;
    }
  }
`

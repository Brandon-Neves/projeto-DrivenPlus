import api from '../services/api'
import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

export default function Subscriptions() {
  const [plans, setPlans] = useState([])
  const { token } = useContext(AuthContext)

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const promise = api.memberships(config)
    promise.then(res => {
      setPlans(res.data)
    })
  }, [])
  return (
    <Container>
      <h1>Escolha seu plano</h1>
      {plans.map(p => (
        <PlansPage key={p.id}>
          <Link to={`${p.id}`}>
            <BoxPlan>
              <img src={p.image} alt="" />
              <p>{p.price}</p>
            </BoxPlan>
          </Link>
        </PlansPage>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  h1 {
    color: #fff;
    font-weight: 700;
    font-size: 32px;
    margin: 35px 0;
  }
`

const PlansPage = styled.div`
  width: 350px;
  display: flex;
  color: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  border: 3px solid #7e7e7e;
  height: 170px;
  border-radius: 12px;
`

const BoxPlan = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-left: 35px;
    font-weight: 700px;
    font-size: 24px;
  }
`

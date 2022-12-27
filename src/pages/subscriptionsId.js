import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import StyledButton from '../components/StyledButton'
import StyledInput from '../components/StyledInput'
import { VISIVEL, ESCONDIDO, STATUS } from '../components/display'
import AuthContext from '../contexts/AuthContext'
import UserContext from '../contexts/UserContext'
import voltar from '../assets/voltar.png'
import cancelar from '../assets/cancelar.png'

export default function PlanId() {
  const id = useParams('')
  const [planPage, setPlanPage] = useState([])
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [securityCode, setSecurityCode] = useState()
  const [expirationDate, setExpirationDate] = useState('')
  const [status, setStatus] = useState(false)
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    sendSubscription()
  }, [])

  function returnSubscriptions() {
    navigate('/subscriptions')
  }

  function confirmSubscription(e) {
    e.preventDefault()
    setStatus(true)
  }

  function unsubscribe() {
    setStatus(false)
  }

  function sendSubscription() {
    const paymentData = {
      membershipId: id.ID_DO_PLANO,
      cardName,
      cardNumber,
      securityNumber: securityCode,
      expirationDate
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const promise = axios.post(
      'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions',
      paymentData,
      config
    )
    promise.then(res => {
      user.membership = res.data.membership
      navigate('/home')
    })
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${id.ID_DO_PLANO}`,
      config
    )
    promise.then(res => {
      setPlanPage(res.data)
    })
    promise.catch(error => {
      return alert(
        'Não foi possível concluir sua solicitação, tente novamente mais tarde'
      )
    })
  }, [])

  return (
    <Container>
      <ContainerImg>
        <Voltar onClick={returnSubscriptions}>
          <img src={voltar} alt="" />
        </Voltar>
        <CancelSubscription status={status} onClick={unsubscribe}>
          <img src={cancelar} alt="" />
        </CancelSubscription>
      </ContainerImg>

      <Header>
        <img src={planPage.image} alt="" />
        <h1>{planPage.name}</h1>
      </Header>
      <ContainerMain>
        <h2>Beneficios:</h2>
        {planPage.perks !== undefined
          ? planPage.perks.map((p, index) => (
              <PerkContainer key={p.id}>
                <p>
                  {index + 1}. {p.title}
                </p>
              </PerkContainer>
            ))
          : ''}
        <h2>Preço</h2>
        <p>{planPage.price}</p>
        <form onSubmit={confirmSubscription} setStatus={true}>
          <StyledInput
            type="text"
            placeholder="Digitos do cartão"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
            required
          />
          <StyledInput
            type="text"
            placeholder="Nome impresso no cartão"
            value={cardName}
            onChange={e => setCardName(e.target.value)}
            required
          />
          <ContainerInput>
            <StyledInput
              type="number"
              placeholder="Código de segurança"
              value={securityCode}
              onChange={e => setSecurityCode(e.target.value)}
              required
            />
            <StyledInput
              type="text"
              placeholder="Validade"
              value={expirationDate}
              onChange={e => setExpirationDate(e.target.value)}
              required
            />
          </ContainerInput>

          <StyledButton>Assinar</StyledButton>
        </form>
      </ContainerMain>
      <BackgroundModal status={status}></BackgroundModal>
      <ContainerModal status={status}>
        <Modal>
          Tem certeza que deseja assinar o plano {planPage.name} R$
          {planPage.price}
          <Div>
            <button onClick={unsubscribe}>Não</button>
            <button onClick={sendSubscription}>Sim</button>
          </Div>
        </Modal>
      </ContainerModal>
    </Container>
  )
}

const Container = styled.div`
  color: #fff;
  margin: 0 auto;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  h2 {
    margin-top: 15px;
  }
  p {
    margin-bottom: 2px;
  }
`
const ContainerImg = styled.div`
  display: flex;
  justify-content: space-between;
`

const Voltar = styled.div`
  margin-top: 20px;
`
const CancelSubscription = styled.div`
  margin-top: 20px;
  z-index: 2;
  display: ${props => (props.status ? VISIVEL : ESCONDIDO)};
`

const Header = styled.div`
  margin: 0 auto;
  h1 {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
  }
  img {
    width: 175px;
    margin: 70px auto 15px auto;
  }
`
const ContainerMain = styled.div`
  margin-left: 15px;
  input {
    width: 95%;
  }
  form {
    margin-top: 34px;
  }
`

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0 15px;
  margin: 2rem auto 1rem auto;
  width: 100%;
  height: 30%;
  background-color: #fff;
  button {
    :first-child {
      background-color: #cecece;
      border: #cecece;
    }
    :last-child {
      background-color: #ff4791;
      border: #ff4791;
    }
    margin-top: 15px;
    color: #fff;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }
`

const BackgroundModal = styled.div`
  display: ${props => (props.status ? VISIVEL : ESCONDIDO)};
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
`
const ContainerModal = styled.div`
  display: ${props => (props.status ? VISIVEL : ESCONDIDO)};
`

const Modal = styled.div`
  flex-direction: column;
  width: 250px;
  height: 180px;
  position: absolute;
  top: 45%;
  transform: translate(20%, -50%);
  z-index: 2;
  padding: 1.2rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 12px;
  background-color: #fff;
  color: #000;
`

const ContainerInput = styled.div`
  display: flex;
  gap: 0 5px;
  input {
    width: 47%;
  }
`

const PerkContainer = styled.div`
  display: flex;
  flex-direction: column;
`

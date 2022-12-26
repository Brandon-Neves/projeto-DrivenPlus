import axios from 'axios'
import { useEffect } from 'react'

const BASE_URL = 'https://mock-api.driven.com.br/api/v4/driven-plus'

function signUp(body) {
  const promise = axios.post(`${BASE_URL}/auth/sign-up`, body)
  return promise
}

function login(body) {
  const promise = axios.post(`${BASE_URL}/auth/login`, body)
  return promise
}

function memberships(config) {
  const promise = axios.get(`${BASE_URL}/subscriptions/memberships`, config)
  return promise
}

function plansId(config, ID_DO_PLANO) {
  const promise = axios.get(
    `${BASE_URL}/subscriptions/memberships/${ID_DO_PLANO}`,
    config
  )
  return promise
}

function toSign() {}

function chanceSignature() {}
function unsubscribe() {}

const api = {
  login,
  signUp,
  memberships,
  plansId,
  toSign,
  chanceSignature,
  unsubscribe
}

export default api

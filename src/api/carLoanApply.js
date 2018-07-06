import axios from '../utils/axios'

export const carInsuranceApply = (data) => axios.post('/car-insurance-apply', data)

export const carBuyApply = (data) => axios.post('/car-group-buy-apply', data)


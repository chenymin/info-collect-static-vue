import axios from '../utils/axios'

export const carInsuranceApply = (data) => axios.post('/car-insurance-apply', data)

export const carBuyApply = (data) => axios.post('/car-group-buy-apply', data)

export const carTypeApply = (data) => axios.post('/save-fast-handle', data)

export const carLoan = (data) => axios.post('/save-fast-apply', data)


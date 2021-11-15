import { combineReducers } from 'redux'
import loginReducer from './loginReducers'

const reducers = combineReducers({
  login: loginReducer
})

export default reducers;
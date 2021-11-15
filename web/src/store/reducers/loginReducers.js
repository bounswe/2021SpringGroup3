import {
  LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, 
  REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE, 
  LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE, 
} from '../types'

const initialState = {
  username: 'Guest',
  id: "",
  email: '',
  password: '',
  isAuthenticated: false,
  loading:false,
  token: "",
  isActivated: false
}
const  LoginReducer = (state = initialState, action) => {
  switch(action.type){

      case LOGIN:
      return {
          ...state,
          username:action.payload.username,
          password:action.payload.password,
          loading:true
      }
      case LOGIN_SUCCESS:
      return {
          ...state,
          loading:false,
          isAuthenticated:true
      }
      case LOGIN_FAILURE:
      return {
          ...state,
          loading:false,
          isAuthenticated:false
      }
      case REGISTER:
      return {
          ...state,
          loading:true
      }
      case REGISTER_SUCCESS:
      return {
          ...state,
          loading:false,
          isAuthenticated:true,
          username: action.payload.username,
          email: action.payload.email,
          password: action.payload.password,
      }
      case REGISTER_FAILURE:
      return {
          ...state,
          loading:false,
          isAuthenticated:false,
          username: 'Guest',
          email: '',
          password: '',
      }
      case LOGOUT:
      return {
          ...state,
          loading:true
      }
      case LOGOUT_SUCCESS:
      return {
          ...state,
          loading:false,
          isAuthenticated:false
      }
      case LOGOUT_FAILURE:
      return {
          ...state,
          loading:false,
          isAuthenticated:true
      }
      default: return state
  }

}

export default LoginReducer;
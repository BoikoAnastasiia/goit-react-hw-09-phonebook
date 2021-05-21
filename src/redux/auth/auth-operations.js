import axios from 'axios';
import authActions from './auth-actions';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

/*
 * POST @ /users/signup
 * body { name, email, password }
 *
 * After successful registration we add a token to HTTP-header
 */
const register = credentials => async dispatch => {
  dispatch(authActions.registerRequest());

  try {
    const response = await axios.post('/users/signup', credentials);
    token.set(response.data.token);

    dispatch(authActions.registerSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(authActions.registerError(error.message));
  }
};

/*
 * POST @ /users/login
 * body:
 *    { email, password }
 *
 * After successful login we add a token to HTTP-header
 */
const logIn = credentials => async dispatch => {
  dispatch(authActions.loginRequest());
  try {
    const response = await axios.post('/users/login', credentials);
    token.set(response.data.token);

    dispatch(authActions.loginSuccess(response.data));
  } catch (error) {
    dispatch(authActions.loginError(error.message));
  }
};

/*
 * POST @ /users/logout
 * headers:
 *    Authorization: Bearer token
 *
 * After successful logout we delete a token from HTTP-header
 */
const logOut = () => async dispatch => {
  dispatch(authActions.logoutRequest());
  try {
    await axios.post('/users/logout');
    dispatch(authActions.logoutSuccess());
  } catch (error) {
    dispatch(authActions.logoutError());
  }
};

/*
 * GET @ /users/current
 * headers:
 *    Authorization: Bearer token
 *
 * 1. Take a token from the state through getState()
 * 2. If the token doesn't exist we exit not doing any of the operations
 * 3. If token exists we add it to its HTTP-header and run the operation
 */
const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();
  if (!persistedToken) {
    return;
  }
  token.set(persistedToken);
  dispatch(authActions.getCurrentUserRequest());
  try {
    const response = await axios.get('/users/current');
    dispatch(authActions.getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(authActions.getCurrentUserError(error.message));
  }
};

export default {
  register,
  logOut,
  logIn,
  getCurrentUser,
};

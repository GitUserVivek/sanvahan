export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER'
export const ADD_REQUEST = 'ADD_REQUEST'
export const PLACE_BID = 'PLACE_BID'
export const ACCEPT_BID = 'ACCEPT_BID'
export const CHANGE_BID = 'CHANGE_BID'

export const registerUser = (user) => {
  return {
    type: REGISTER_USER,
    payload: user,
  };
};

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: user,
  };
};

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const addRequest = (request) => ({
  type: ADD_REQUEST,
  payload: request,
});

export const placeBid = (requestId, bid) => ({
  type: PLACE_BID,
  payload: { requestId, bid },
});

export const acceptBid = (requestId, acceptedBidIndex) => ({
  type: ACCEPT_BID,
  payload: { requestId, acceptedBidIndex },
});

export const changeBid = (requestId) => ({
  type: CHANGE_BID,
  payload: { requestId },
});
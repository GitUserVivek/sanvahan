import { createStore } from 'redux';
import { ACCEPT_BID, ADD_REQUEST, CHANGE_BID, LOGIN_USER, LOGOUT_USER, PLACE_BID, REGISTER_USER } from '../actions/actions';

const initialState = {
  loggedInUser: null,
  registeredUsers: [],
  requests: [
    // { id: 1, pickup: 'Location A', drop: 'Location B', distance: '20 km', status: 'Pending', bids: [] },
    {
      id: 1,
      pickup: "Location A",
      drop: "Location B",
      distance: "20 km",
      status: "Completed",
      bids: [
        {
          amount: "100",
          owner: "Truck Owner 1",
          status: "Accepted"
        },
        {
          amount: "199",
          owner: "Truck Owner 2",
          status: "Rejected"
        },
        {
          amount: "299",
          owner: "Truck Owner 3",
          status: "Rejected"
        }
      ]
    }
  ],
  bidAmounts: {},
};

// const initialState = {
//   loggedInUser: null,
//   registeredUsers: [],
//   requests: [],  // Assuming 'requests' data is part of your existing reducer
// };

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    // Handle Login User
    case LOGIN_USER:
      return {
        ...state,
        loggedInUser: action.payload,
      };

    case LOGOUT_USER:
      // Clear the localStorage when the user logs out
      localStorage.removeItem('token');
      return {
        ...state,
        loggedInUser: null,
      };


    // Example of existing cases, we kept them as they were
    case ADD_REQUEST:
      return {
        ...state,
        requests: [...state.requests, action.payload],
      };

    case PLACE_BID:
      return {
        ...state,
        requests: state.requests.map((request) =>
          request.id === action.payload.requestId
            ? { ...request, bids: [...request.bids, action.payload.bid] }
            : request
        ),
      };

    case ACCEPT_BID:
      return {
        ...state,
        requests: state.requests.map((request) =>
          request.id === action.payload.requestId
            ? {
              ...request,
              status: 'Completed',
              bids: request.bids.map((bid, index) =>
                index === action.payload.acceptedBidIndex
                  ? { ...bid, status: 'Accepted' }
                  : { ...bid, status: 'Rejected' }
              ),
            }
            : request
        ),
      };

    case CHANGE_BID:
      return {
        ...state,
        requests: state.requests.map((request) =>
          request.id === action.payload.requestId
            ? {
              ...request,
              status: 'Pending',
              bids: request.bids.map((bid) => ({ ...bid, status: 'Pending' })),
            }
            : request
        ),
      };

    default:
      return state;
  }
};


const store = createStore(reducer);

export default store;

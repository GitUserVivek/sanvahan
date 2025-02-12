#!/bin/bash

# Exit on errors
set -e

# Step 1: Install necessary dependencies
echo "Installing necessary dependencies..."
npm install redux react-redux react-router-dom

# Step 2: Create necessary directories and files
echo "Setting up directory structure and files..."

# Create components folder
mkdir -p src/components

# Create actions and store files
mkdir -p src/actions
mkdir -p src/store

# Create App.jsx and index.jsx
cat > src/App.jsx <<EOL
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerPanel from './components/CustomerPanel';
import AdminPanel from './components/AdminPanel';
import TruckOwnerPanel from './components/TruckOwnerPanel';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={AdminPanel} />
          <Route path="/customer" component={CustomerPanel} />
          <Route path="/truck-owner" component={TruckOwnerPanel} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
EOL

cat > src/index.jsx <<EOL
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
EOL

# Step 3: Create Redux store and actions
cat > src/store/store.jsx <<EOL
import { createStore } from 'redux';

const initialState = {
  requests: [
    { id: 1, pickup: 'Location A', drop: 'Location B', distance: '20 km', status: 'Pending', bids: [] },
  ],
  bidAmounts: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_REQUEST':
      return {
        ...state,
        requests: [...state.requests, action.payload],
      };
    case 'PLACE_BID':
      return {
        ...state,
        requests: state.requests.map((request) =>
          request.id === action.payload.requestId
            ? { ...request, bids: [...request.bids, action.payload.bid] }
            : request
        ),
      };
    case 'ACCEPT_BID':
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
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
EOL

cat > src/actions/actions.jsx <<EOL
export const addRequest = (request) => ({
  type: 'ADD_REQUEST',
  payload: request,
});

export const placeBid = (requestId, bid) => ({
  type: 'PLACE_BID',
  payload: { requestId, bid },
});

export const acceptBid = (requestId, acceptedBidIndex) => ({
  type: 'ACCEPT_BID',
  payload: { requestId, acceptedBidIndex },
});
EOL

# Step 4: Create components for Admin, Customer, and Truck Owner panels
cat > src/components/AdminPanel.jsx <<EOL
import React from 'react';
import { useSelector } from 'react-redux';

function AdminPanel() {
  const requests = useSelector((state) => state.requests);

  return (
    <div className="col-span-1 border p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id} className="mb-2 border-b pb-2">
            <strong>Request {request.id}:</strong> {request.pickup} to {request.drop} ({request.distance})<br />
            <strong>Status:</strong> {request.status}
            <ul>
              {request.bids.map((bid, index) => (
                <li key={index} className={bid.status === "Accepted" ? "text-green-500" : "text-red-500"}>
                  {bid.owner} - Rs. {bid.amount} ({bid.status})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
EOL

cat > src/components/CustomerPanel.jsx <<EOL
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../actions';

function CustomerPanel() {
  const [newRequest, setNewRequest] = useState({ pickup: '', drop: '', distance: '' });
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  const handleAddRequest = () => {
    if (newRequest.pickup && newRequest.drop && newRequest.distance) {
      const request = {
        id: requests.length + 1,
        ...newRequest,
        status: 'Pending',
        bids: []
      };
      dispatch(addRequest(request));
      setNewRequest({ pickup: '', drop: '', distance: '' });
    }
  };

  return (
    <div className="border p-4">
      <h2 className="text-xl font-bold mb-4">Customer Panel</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pickup Location"
          value={newRequest.pickup}
          onChange={(e) => setNewRequest({ ...newRequest, pickup: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Drop Location"
          value={newRequest.drop}
          onChange={(e) => setNewRequest({ ...newRequest, drop: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Distance"
          value={newRequest.distance}
          onChange={(e) => setNewRequest({ ...newRequest, distance: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={handleAddRequest} className="bg-blue-500 text-white px-4 py-2">Add Request</button>
      </div>
    </div>
  );
}

export default CustomerPanel;
EOL

cat > src/components/TruckOwnerPanel.jsx <<EOL
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeBid } from '../actions';

function TruckOwnerPanel() {
  const [bidAmounts, setBidAmounts] = useState({});
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();
  const truckOwners = ['Truck Owner 1', 'Truck Owner 2', 'Truck Owner 3'];

  const handlePlaceBid = (requestId, ownerName) => {
    const bidAmount = bidAmounts[`${requestId}-${ownerName}`];
    if (bidAmount && !isNaN(bidAmount)) {
      dispatch(placeBid(requestId, { amount: bidAmount, owner: ownerName, status: 'Pending' }));
      setBidAmounts({ ...bidAmounts, [`${requestId}-${ownerName}`]: '' });
    }
  };

  return (
    <div className="border p-4">
      <h2 className="text-xl font-bold mb-4">Truck Owner Panel</h2>
      {requests.map((request) => (
        <div key={request.id} className="mb-4 border-b pb-2">
          <p>
            <strong>Request {request.id}:</strong> {request.pickup} to {request.drop} ({request.distance})
          </p>
          {truckOwners.map((owner) => (
            <div key={owner} className="flex items-center mb-2">
              <span className="mr-2">{owner}:</span>
              <input
                type="number"
                placeholder="Bid Amount"
                className="border p-2 mr-2"
                value={bidAmounts[`${request.id}-${owner}`] || ''}
                onChange={(e) => setBidAmounts({ ...bidAmounts, [`${request.id}-${owner}`]: e.target.value })}
              />
              <button onClick={() => handlePlaceBid(request.id, owner)} className="bg-blue-500 text-white px-4 py-2">
                Place Bid
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TruckOwnerPanel;
EOL

# Step 5: Success message
echo "Project setup completed successfully!"

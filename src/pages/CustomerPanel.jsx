import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, acceptBid, changeBid } from '../redux/actions/actions';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

function CustomerPanel() {
  const [newRequest, setNewRequest] = useState({ pickup: '', drop: '', distance: '' });
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.loggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login")
    }
  }, [])
  const handleAddRequest = () => {
    if (newRequest.pickup && newRequest.drop && newRequest.distance) {
      const request = {
        id: requests.length + 1,
        ...newRequest,
        status: 'Pending',
        bids: [],
      };
      dispatch(addRequest(request));
      setNewRequest({ pickup: '', drop: '', distance: '' });
    }
  };

  const handleAcceptBid = (requestId, acceptedBidIndex) => {
    dispatch(acceptBid(requestId, acceptedBidIndex)); // Accept the bid
  };

  const handleChangeBid = (requestId) => {
    dispatch(changeBid(requestId)); // Reset the bids to "Pending"
  };

  return (
    <Card>
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
          <button onClick={handleAddRequest} className="bg-blue-500 text-white px-4 py-2">
            Add Request
          </button>
        </div>

        <h3 className="text-lg font-bold mb-2">Pending Requests</h3>
        {requests.map((request) => (
          <div key={request.id} className="mb-4 border-b pb-2">
            <p>
              <strong>Request {request.id}:</strong> {request.pickup} to {request.drop} ({request.distance})
            </p>
            {request.bids.length > 0 && (
              <ul>
                {request.bids.map((bid, index) => (
                  <li key={index} className={`mb-2`} >
                    <strong>{bid.owner}</strong> - Rs. {bid.amount} (<span className={bid.status === "Accepted" ? "text-green-500" : bid.status === "Pending" ? "text-yellow-500" : "text-red-500"} > {bid.status} </span>)

                    {/* Show Accept button only if the bid is pending */}
                    {
                      bid.status === 'Pending' && (
                        <button
                          onClick={() => handleAcceptBid(request.id, index)}
                          className="bg-green-500 text-white px-4 py-2 ml-2"
                        >
                          Accept
                        </button>
                      )
                    }
                  </li>
                ))}
              </ul>
            )}

            {/* Show the Change button after a bid is accepted */}
            {request.status === 'Completed' && (
              <button
                onClick={() => handleChangeBid(request.id)}
                className="bg-yellow-500 text-white px-4 py-2 mt-2"
              >
                Change
              </button>
            )}
          </div>
        ))
        }
      </div >
    </Card>
  );
}

export default CustomerPanel;

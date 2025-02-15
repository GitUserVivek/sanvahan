import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeBid } from '../actions/actions';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

function TruckOwnerPanel() {
  const [bidAmounts, setBidAmounts] = useState({});
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();
  const truckOwners = ['Truck Owner 1', 'Truck Owner 2', 'Truck Owner 3'];
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const navigate = useNavigate();


  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login")
    }
  }, [])
  const handlePlaceBid = (requestId, ownerName) => {
    const bidAmount = bidAmounts[`${requestId}-${ownerName}`];
    if (bidAmount && !isNaN(bidAmount)) {
      dispatch(placeBid(requestId, { amount: bidAmount, owner: ownerName, status: 'Pending' }));
      setBidAmounts({ ...bidAmounts, [`${requestId}-${ownerName}`]: '' });
    }
  };

  return (
    <Card>
      <div className="border p-4">
        <h2 className="text-xl font-bold mb-4">Truck Owner Panel</h2>
        {requests.map((request) => (
          <div key={request.id} className="mb-4 border-b pb-2">
            <p>
              <strong>Request {request.id}:</strong> {request.pickup} to {request.drop} ({request.distance})
            </p>
            {truckOwners.map((owner) => {
              const ownerBid = request.bids.find((bid) => bid.owner === owner);
              return (
                <div key={owner} className="flex items-center mb-2">
                  <span className="mr-2">{owner}:</span>
                  {ownerBid ? (
                    <span className={ownerBid.status === 'Accepted' ? 'text-green-500' : 'text-red-500'}>
                      Rs. {ownerBid.amount} ({ownerBid.status})
                    </span>
                  ) : (
                    <input
                      type="number"
                      placeholder="Bid Amount"
                      className="border p-2 mr-2"
                      value={bidAmounts[`${request.id}-${owner}`] || ''}
                      onChange={(e) => setBidAmounts({ ...bidAmounts, [`${request.id}-${owner}`]: e.target.value })}
                    />
                  )}
                  {ownerBid ? null : (
                    <button
                      onClick={() => handlePlaceBid(request.id, owner)}
                      className="bg-blue-500 text-white px-4 py-2"
                    >
                      Place Bid
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default TruckOwnerPanel;

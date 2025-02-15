import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const requests = useSelector((state) => state.requests);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login")
    }
  }, [])
  return (
    <Card>
      <div className="col-span-1 border p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <ul>
          {requests.map((request) => (
            <li key={request.id} className="mb-2 border-b pb-2">
              <strong>Request {request.id}:</strong> {request.pickup} to {request.drop} ({request.distance})<br />
              <strong>Status:</strong> {request.status}
              {console.log(request)}
              <ul>
                {request.bids.map((bid, index) => (
                  <li key={index} className="mb-2">
                    {bid.owner} - Rs. {bid.amount} (<span className={bid.status === "Accepted" ? "text-green-500" : bid.status === "Pending" ? "text-yellow-500" : "text-red-500"} > {bid.status} </span>)
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export default AdminPanel;

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import Map from '../components/Map';

function AdminPanel() {
  const requests = useSelector((state) => state.requests);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, []);

  return (
    <Card>
      <div className="flex flex-col h-full w-full p-4">
        {/* Request List - Takes up available space */}
        <div className="w-full h-auto flex-1 overflow-auto border-b pb-4">
          <ul>
            {requests.map((request) => (
              <li key={request.id} className="mb-2 border-b pb-2">
                <strong>Request {request.id}:</strong> {request.pickup} to {request.drop} ({request.distance})<br />
                <strong>Status:</strong> {request.status}
                <ul>
                  {request.bids.map((bid, index) => (
                    <li key={index} className="mb-2">
                      {bid.owner} - Rs. {bid.amount} (<span className={bid.status === "Accepted" ? "text-green-500" : bid.status === "Pending" ? "text-yellow-500" : "text-red-500"}> {bid.status} </span>)
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* Map - Fixed height at bottom */}
        <div className="w-full h-[400px] mt-4 border shadow-lg rounded-lg overflow-hidden">
          <Map />
        </div>
      </div>
    </Card>
  );
}

export default AdminPanel;

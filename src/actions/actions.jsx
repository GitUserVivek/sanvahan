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

export const changeBid = (requestId) => ({
  type: 'CHANGE_BID',
  payload: { requestId },
});
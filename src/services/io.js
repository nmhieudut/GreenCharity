import { io } from 'socket.io-client';

function createSocket() {
  const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);
  return socket;
}

export const subscribeToAuctionChanges = cb => {
  createSocket().on('auction-change', cb);
};

export const subscribeToUserChanges = cb => {
  createSocket().on('user-change', cb);
};

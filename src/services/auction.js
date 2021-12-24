import _http from 'src/libs/axios';
import Rest from 'src/api';

export const AuctionService = {
  getAuctions: status => _http.get(Rest.auction + `?status=${status}`),
  getAuction: id => _http.get(Rest.auction + '/' + id),
  createAuction: payload => _http.post(Rest.auction, payload),
  updateAuction: (id, payload) => _http.put(Rest.auction + '/' + id, payload),
  deleteAuction: id => _http.delete(Rest.auction + '/' + id),
  // bid
  bid: (id, amount) => _http.put(Rest.auction + '/' + id + '/bid', { amount })
};

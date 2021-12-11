import _http from 'src/libs/axios';
import Rest from 'src/api';

export const UserService = {
  getMany: () => _http.get(Rest.user),

  update: (userId, payload) => _http.put(`${Rest.user}/${userId}`, payload),

  resetPassword: (userId, payload) =>
    _http.put(`${Rest.user}/${userId}/reset-password`, payload),

  charge: (userId, payload) =>
    _http.put(`${Rest.balance}/charge/${userId}`, payload),

  checkout: (type, payload) => _http.post(`${Rest.checkout}/${type}`, payload),

  getTransactions: userId => _http.get(`${Rest.user}/${userId}/transactions`),

  getDonationsHistory: userId => _http.get(`${Rest.user}/${userId}/donations`)
};

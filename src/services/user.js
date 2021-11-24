import _http from 'src/libs/axios';
import Rest from 'src/api';

export const UserService = {
  getMany: () => _http.get(Rest.user),

  update: (userId, payload) => _http.put(`${Rest.user}/${userId}`, payload),

  charge: (userId, payload) => _http.post(`${Rest.charge}/${userId}`, payload),

  checkout: (type, payload) => _http.post(`${Rest.checkout}/${type}`, payload)
};

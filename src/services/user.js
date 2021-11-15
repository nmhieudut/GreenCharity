import _http from 'src/libs/axios';
import Rest from 'src/api';

export const UserService = {
  getMany: () => {},

  getInfo: () => _http.get(Rest.checkCurrentUser),

  update: payload => _http.put(Rest.user, payload),

  getWallets: () => _http.get(`${Rest.wallet}/list`),

  createWallet: () => _http.post(Rest.wallet),

  deleteWallet: id => _http.delete(`${Rest.wallet}/${id}`)
};

import _http from 'src/libs/axios';
import Rest from 'src/api';

export const AdminService = {
  getUsers: () => _http.get(Rest.admin + '/users'),
  updateUser: (id, data) => _http.put(Rest.admin + '/users/' + id, data),
  toggleActiveUser: id => _http.put(Rest.admin + '/users/' + id + '/active'),
  deleteUser: id => _http.delete(Rest.admin + '/users/' + id)
};

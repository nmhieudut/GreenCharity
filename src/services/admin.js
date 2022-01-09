import _http from 'src/libs/axios';
import Rest from 'src/api';

export const AdminService = {
  getUsers: () => _http.get(Rest.admin + '/users'),
  createUser: payload => _http.post(Rest.admin + '/users', payload),
  updateUser: (id, data) => _http.put(Rest.admin + '/users/' + id, data),
  toggleActiveUser: id => _http.put(Rest.admin + '/users/' + id + '/active'),
  deleteUser: id => _http.delete(Rest.admin + '/users/' + id),

  getCampaigns: () => _http.get(Rest.admin + '/campaigns'),
  updateCampaign: (id, data) =>
    _http.put(Rest.admin + '/campaigns/' + id, data),
  activeCampaign: id => _http.put(Rest.admin + '/campaigns/' + id + '/active'),
  deleteCampaign: id => _http.delete(Rest.admin + '/campaigns/' + id),
  endCampaign: id => _http.put(Rest.admin + '/campaigns/' + id + '/end')
};

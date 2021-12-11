import _http from 'src/libs/axios';
import Rest from 'src/api';

export const newsService = {
  fetchAll: () => _http.get(Rest.news),

  fetchById: _id => _http.get(`${Rest.news}/${_id}`)
};

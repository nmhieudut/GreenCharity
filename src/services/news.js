import _http from 'src/libs/axios';
import Rest from 'src/api';

export const newsService = {
  fetchAll: (limit, page) => {
    const limitString = limit ? `&skip=${limit}` : '';
    const pageString = page ? `&page=${page}` : '';
    return _http.get(
      `${Rest.news}?${limitString}${pageString}`
    );
  },

  fetchById: _id => _http.get(`${Rest.news}/${_id}`)
};

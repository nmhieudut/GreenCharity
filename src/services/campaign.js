import _http from 'src/libs/axios';
import Rest from 'src/api';

export const CampaignService = {
  getBySlug: slug => _http.get(`${Rest.campaigns}/${slug}`),

  getByAuthor: id => _http.get(`${Rest.campaigns}/owner/${id}`),

  fetchCampaigns: (query, status, skip) => {
    const queryString = query ? `q=${query}` : '';
    const statusString = status ? `&status=${status}` : '';
    const skipString = skip ? `&skip=${skip}` : '';
    return _http.get(
      `${Rest.campaigns}/search?${queryString}${statusString}${skipString}`
    );
  },

  fetchComments: id => _http.get(`${Rest.campaigns}/${id}/comments`),

  donate: (id, payload) =>
    _http.post(`${Rest.campaigns}/${id}/donate`, payload),

  create: payload => _http.post(Rest.campaigns, payload),

  update: (id, payload) => _http.put(`${Rest.campaigns}/${id}`, payload),

  delete: id => _http.delete(`${Rest.campaigns}/${id}`)
};

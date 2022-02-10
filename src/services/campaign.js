import _http from 'src/libs/axios';
import Rest from 'src/api';

export const CampaignService = {
  getBySlug: slug => _http.get(`${Rest.campaigns}/${slug}`),

  getByAuthor: id => _http.get(`${Rest.campaigns}/owner/${id}`),

  fetchSummary: () => _http.get(`${Rest.campaigns}/info/summary`),

  fetchCampaignsByStatus: status =>
    _http.get(`${Rest.campaigns}/status/${status}`),

  fetchCampaigns: (query, status, limit, page) => {
    const queryString = query ? `q=${query}` : '';
    const statusString = status ? `&status=${status}` : '';
    const limitString = limit ? `&skip=${limit}` : '';
    const pageString = page ? `&page=${page}` : '';
    return _http.get(
      `${Rest.campaigns}/search?${queryString}${statusString}${limitString}${pageString}`
    );
  },

  fetchComments: id => _http.get(`${Rest.campaigns}/${id}/comments`),

  fetchDonations: id => _http.get(`${Rest.campaigns}/${id}/donations`),

  fetchRE: id => _http.get(`${Rest.campaigns}/${id}/receipts_expenditures`),

  addRE: (id, payload) =>
    _http.post(`${Rest.campaigns}/${id}/receipts_expenditures`, payload),

  donate: (id, payload) =>
    _http.post(`${Rest.campaigns}/${id}/donate`, payload),

  create: payload => _http.post(Rest.campaigns, payload),

  update: (id, payload) => _http.put(`${Rest.campaigns}/${id}`, payload),

  delete: id => _http.delete(`${Rest.campaigns}/${id}`)
};

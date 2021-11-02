import _http from "src/libs/axios";
import Rest from "src/api";

export const CampaignService = {
  getById: id => _http.get(`${Rest.campaigns}/${id}`),

  fetchCampaigns: (query, skip) => _http.get(Rest.campaigns + "/search"),

  fetchComments: id => _http.get(`${Rest.campaigns}/${id}/comments`),

  create: payload => _http.post(Rest.campaigns, payload),

  update: (id, content) => _http.put(`${Rest.campaigns}/${id}`, { content }),

  delete: id => _http.delete(`${Rest.campaigns}/${id}`)
};

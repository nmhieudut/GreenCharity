import axiosClient from "src/libs/axios";
import Rest from "src/api";

export const CampaignService = {
  async getById(id) {
    try {
      return await axiosClient.get(`${Rest.campaigns}/${id}`);
    } catch (err) {
      return err;
    }
  },
  async fetchCampaigns(query, skip) {
    try {
      return await axiosClient.get(Rest.campaigns + "/search");
    } catch (err) {
      return err;
    }
  },
  async fetchComments(id) {
    try {
      return await axiosClient.get(`${Rest.campaigns}/${id}/comments`);
    } catch (err) {
      return err;
    }
  },
  async create(payload) {
    try {
      return await axiosClient.post(Rest.campaigns, payload);
    } catch (err) {
      return err;
    }
  },
  async update(id, content) {
    try {
      return await axiosClient.put(`${Rest.campaigns}/${id}`, { content });
    } catch (err) {
      return err;
    }
  },
  async delete(id) {
    try {
      return await axiosClient.delete(`${Rest.campaigns}/${id}`);
    } catch (err) {
      return err;
    }
  }
};

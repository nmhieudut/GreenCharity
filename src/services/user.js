import axiosClient from "src/libs/axios";
import Rest from "src/api";

export const UserService = {
  async update(payload) {
    return await axiosClient.put(Rest.user, payload);
  }
};

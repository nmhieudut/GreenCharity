import axiosClient from "src/libs/axios";
import Rest from "src/api";

export const CommentService = {
  async create(_id, text) {
    return await axiosClient.post(Rest.comments + `/${_id}`, { text });
  }
};

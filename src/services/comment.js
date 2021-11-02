import _http from "src/libs/axios";
import Rest from "src/api";

export const CommentService = {
  create: (_id, text) => _http.post(Rest.comments + `/${_id}`, { text })
};

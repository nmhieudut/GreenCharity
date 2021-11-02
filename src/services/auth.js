import _http from "src/libs/axios";
import Rest from "src/api";

export const AuthService = {
  login: userPayload => _http.post(Rest.login, userPayload),

  register: userPayload => _http.post(Rest.register, userPayload),

  loginWithGoogle: idToken => _http.post(Rest.loginGG, { idToken })
};

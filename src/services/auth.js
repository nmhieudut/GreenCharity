import _http from "src/libs/axios";
import Rest from "src/api";

export const AuthService = {
  login: (email, password) => _http.post(Rest.login, { email, password }),

  register: (name, email, password, phoneNumber) =>
    _http.post(Rest.register, { name, email, password, phoneNumber }),

  loginWithGoogle: idToken => _http.post(Rest.loginGG, { idToken })
};

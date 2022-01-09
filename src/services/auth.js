import _http from 'src/libs/axios';
import Rest from 'src/api';

export const AuthService = {
  login: (email, password) => _http.post(Rest.login, { email, password }),

  logout: () => _http.post(Rest.logout),

  register: (name, email, password, phoneNumber) =>
    _http.post(Rest.register, { name, email, password, phoneNumber }),

  getInfo: () => _http.get(Rest.checkCurrentUser),

  loginWithGoogle: idToken => _http.post(Rest.loginGG, { idToken })
};

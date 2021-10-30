import axiosClient from "src/libs/axios";
import Rest from "src/api";

export const AuthService = {
  async login(email, password) {
    const userPayload = {
      email,
      password
    };
    return await axiosClient.post(Rest.login, userPayload);
  },
  async register(name, email, password, phoneNumber) {
    const userPayload = {
      name,
      email,
      password,
      phoneNumber
    };
    return await axiosClient.post(Rest.register, userPayload);
  },
  async verifyUser() {
    return await axiosClient.get(Rest.checkCurrentUser);
  },
  async loginWithGoogle(idToken) {
    return await axiosClient.post(Rest.loginGG, { idToken });
  },
  async loginWithFacebook(email, password) {
    const userPayload = {
      email,
      password
    };
    return await axiosClient.post(Rest.login, userPayload);
  }
};

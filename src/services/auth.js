import axiosClient from "src/libs/axios";
import Rest from "src/api";

const Login = async (email, password) => {
  const userPayload = {
    email,
    password
  };
  return await axiosClient.post(Rest.login, userPayload);
};
const Register = async (name, email, password) => {
  const userPayload = {
    name,
    email,
    password
  };
  return await axiosClient.post(Rest.register, userPayload);
};

export { Login, Register };

import axiosClient from "src/libs/axios";
import Rest from "src/api";

export const UserService = {
  async update(
    name,
    phoneNumber,
    address,
    account_id,
    accountNumber,
    accountName,
    bankAddress
  ) {
    const userPayload = {
      name,
      phoneNumber,
      address,
      account_number,
      accountName,
      bankAddress
    };
    return await axiosClient.put(Rest.user, userPayload);
  }
};

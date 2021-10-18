export const LSManager = {
  // token
  setToken: token => {
    if (typeof window !== "undefined")
      return localStorage.setItem("access-token", token);
  },
  getToken: () => {
    if (typeof window !== "undefined")
      return localStorage.getItem("access-token")?.toString();
  },
  removeToken: () => {
    if (typeof window !== "undefined")
      return localStorage.remove("access-token");
  },

  // clear all data in local storage
  clearSite: () => {
    if (typeof window !== "undefined") return window.localStorage.clear();
  }
};

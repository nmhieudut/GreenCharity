import Cookies from "js-cookie";
function removeCookie() {
  Object.keys(Cookies.get()).forEach(function (cookie) {
    Cookies.remove(cookie);
  });
}
export default removeCookie;

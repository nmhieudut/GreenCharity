import _http from 'src/libs/axios';
import Rest from 'src/api';

export const CheckoutService = {
  checkout: (type, payload) => _http.post(`${Rest.checkout}/${type}`, payload),
  returnUrl: (method, params) =>
    _http.get(`${Rest.checkout}/${method}/return`, { params })
};

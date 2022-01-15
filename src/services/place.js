import Rest from 'src/api';
import _http from 'src/libs/axios';

export const PlaceService = {
  fetchProvinces: () => _http.get(`${Rest.province}`),
  fetchDistricts: provinceId =>
    _http.get(`${Rest.province}/district/${provinceId}`),
  fetchWards: districtId => _http.get(`${Rest.province}/ward/${districtId}`)
};

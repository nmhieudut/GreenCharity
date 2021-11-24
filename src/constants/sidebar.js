import { FiSettings, FiUser } from 'react-icons/fi';
import { MdCampaign } from 'react-icons/md';

export const meSideBar = [
  { title: 'Tài khoản', icon: FiUser, path: '/me' },
  { title: 'Các chiến dịch', icon: MdCampaign, path: '/me/my-campaigns' },
  { title: 'Cài đặt', icon: FiSettings, path: '/me/settings' }
];

import { BiDonateHeart } from 'react-icons/bi';
import { FiSettings, FiUser } from 'react-icons/fi';
import { MdCampaign, MdOutlineAttachMoney } from 'react-icons/md';

export const meSideBar = [
  {
    title: 'Tài khoản',
    icon: FiUser,
    path: '/me',
    description: 'Quản lí tài khoản của bạn'
  },
  {
    title: 'Hoạt động',
    icon: MdCampaign,
    path: '/me/my-campaigns',
    description: 'Xem các hoạt động của bạn'
  },
  {
    title: 'Lịch sử quyên góp',
    icon: BiDonateHeart,
    path: '/me/donate-history',
    description: 'Xem các hoạt động bạn đã quyên góp'
  },
  {
    title: 'Lịch sử nạp tiền',
    icon: MdOutlineAttachMoney,
    path: '/me/charge-history',
    description: 'Xem lịch sử nạp tiền vào tài khoản của bạn'
  },
  {
    title: 'Cài đặt',
    icon: FiSettings,
    path: '/me/settings',
    description: 'Cài đặt thêm'
  }
];

export const adminSideBar = [];

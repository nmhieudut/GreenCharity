import { AiOutlineTransaction } from 'react-icons/ai';
import { BiDonateHeart } from 'react-icons/bi';
import { FiSettings, FiUser } from 'react-icons/fi';
import { IoMdKey } from 'react-icons/io';
import { MdCampaign } from 'react-icons/md';

export const meSideBar = [
  {
    title: 'Tài khoản',
    icon: FiUser
  },
  {
    title: 'Đổi mật khẩu',
    icon: IoMdKey
  },
  {
    title: 'Hoạt động của tôi',
    icon: MdCampaign
  },
  {
    title: 'Lịch sử quyên góp',
    icon: BiDonateHeart
  },
  {
    title: 'Lịch sử giao dịch',
    icon: AiOutlineTransaction
  },
  {
    title: 'Cài đặt',
    icon: FiSettings
  }
];

export const adminSideBar = [
  {
    title: 'Lịch sử quyên góp',
    icon: BiDonateHeart,
    path: '/me/donate-history',
    description: 'Xem các hoạt động bạn đã quyên góp'
  }
];

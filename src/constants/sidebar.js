import { AiOutlineTransaction } from 'react-icons/ai';
import { BiDonateHeart } from 'react-icons/bi';
import { BsNewspaper } from 'react-icons/bs';
import { FiSettings, FiUser } from 'react-icons/fi';
import { IoMdKey } from 'react-icons/io';
import { MdCampaign } from 'react-icons/md';
import { RiAuctionFill } from 'react-icons/ri';

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
    title: 'Người dùng',
    icon: FiUser,
    path: 'users'
  },
  {
    title: 'Các hoạt động',
    icon: MdCampaign,
    path: 'campaigns'
  },
  {
    title: 'Giao dịch hệ thống',
    icon: AiOutlineTransaction,
    path: 'transactions'
  },
  {
    title: 'Các quyên góp',
    icon: BiDonateHeart,
    path: 'donations'
  },
  {
    title: 'Các phiên đấu giá',
    icon: RiAuctionFill,
    path: 'auctions'
  },
  {
    title: 'Tin tức',
    icon: BsNewspaper,
    path: 'news'
  },
  {
    title: 'Cài đặt',
    icon: FiSettings
    // path: 'settings'
  }
];

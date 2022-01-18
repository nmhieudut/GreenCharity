import { AiOutlineTransaction } from 'react-icons/ai';
import { BiDonateHeart } from 'react-icons/bi';
import { BsMessenger, BsNewspaper } from 'react-icons/bs';
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
    title: 'Các phiên đấu giá',
    icon: RiAuctionFill,
    path: 'auctions'
  },
  {
    title: 'Giao dịch hệ thống',
    icon: AiOutlineTransaction,
    path: 'transactions'
  },
  {
    title: 'Tin tức',
    icon: BsNewspaper,
    path: 'news'
  },
  {
    title: 'Tin nhắn hệ thống',
    icon: BsMessenger,
    path: 'https://business.facebook.com/latest/inbox/messenger?selected_item_id=103319752257876&nav_ref=redirect_biz_inbox_messenger_notif%3Fnotif_m%3Dalerts_page&notif_id=1642500965954296&notif_t=page_message&ref=notif&asset_id=109527714958989'
  }
];

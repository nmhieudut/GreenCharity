const Rest = {
  // auth services
  login: '/auth/login',
  logout: '/auth/logout',
  loginGG: '/auth/google',
  loginFB: '/auth/facebook',
  register: '/auth/register',
  checkCurrentUser: '/auth/verify',

  // campaigns services
  campaigns: '/campaigns',
  comments: '/comments',

  //user services
  user: '/users',

  //news services
  news: '/news',

  //charge services
  balance: '/balance',

  //checkout services
  checkout: '/checkout',

  //auction services
  auction: '/auctions',

  //province services
  province: '/province',

  //admin services
  admin: '/admin'
};

export default Rest;

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

  //charge
  balance: '/balance',

  //checkout
  checkout: '/checkout',

  //auction
  auction: '/auctions',

  //admin
  admin: '/admin'
};

export default Rest;

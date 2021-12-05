const Rest = {
  // auth services
  login: '/auth/login',
  loginGG: '/auth/google',
  loginFB: '/auth/facebook',
  register: '/auth/register',
  checkCurrentUser: '/auth/verify',

  // campaigns services
  campaigns: '/campaigns',
  comments: '/comments',

  //user services
  user: '/users',

  //charge
  balance: '/balance',

  //checkout
  checkout: '/checkout'
};

export default Rest;

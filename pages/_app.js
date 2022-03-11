import { ChakraProvider } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'flatpickr/dist/themes/material_green.css';
import 'focus-visible/dist/focus-visible';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import GlobalSpinner from 'src/components/common/Spinner/GlobalSpinner';
import { color } from 'src/constants/color';
import Layout from 'src/layout';
import 'src/libs/firebase';
import { AuthService } from 'src/services/auth';
import { subscribeToUserChanges } from 'src/services/io';
import { wrapper } from 'src/store';
import { AuthActions } from 'src/store/auth/action';
import { storage } from 'src/utils/storage';
import theme from 'src/utils/theme';
import '../styles/globals.scss';

const hoverEffect =
  typeof window !== `undefined` ? require('hover-effect').default : null;

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false
});

const GlobalStyles = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const globalLoading = useSelector(state => state.modal.globalLoading);
  const currentUser = useSelector(state => state.auth.currentUser);

  const verifyUser = async () => {
    if (storage.getToken() !== '') {
      dispatch(AuthActions.setCurrentUserAction());
      try {
        const res = await AuthService.getInfo();
        dispatch(AuthActions.setCurrentUserSuccessAction(res.data));
      } catch {
        dispatch(AuthActions.setCurrentUserFailedAction());
      }
    }
  };

  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      offset: 50
    });
    const el = document.querySelector('.animate__item');
    new hoverEffect({
      parent: el,
      intensity: 0.3,
      image1: '/images/damvinhhung.jpg',
      image2: '/images/thuytien.png',
      displacementImage: 'https://picsum.photos/id/237/200/300',
      imagesRatio: 0.6
    });
  }, []);

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteDone);
    Router.events.on('routeChangeError', handleRouteDone);

    return () => {
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteDone);
      Router.events.off('routeChangeError', handleRouteDone);
    };
  }, []);

  useEffect(() => {
    verifyUser();
    subscribeToUserChanges(event => {
      const { user, type } = event;
      if (type === 'update') {
        if (currentUser && currentUser.id === user._id) {
          return dispatch(
            AuthActions.setCurrentUserSuccessAction({ ...user, id: user._id })
          );
        }
      }
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Global styles={GlobalStyles} />
        {currentUser?.role !== 'admin' && (
          <MessengerCustomerChat
            pageId='109527714958989'
            appId='1039627213546984'
            themeColor={color.PRIMARY}
            language='vi_VN'
          />
        )}

        <Layout>
          <Component {...pageProps} />
          {globalLoading && <GlobalSpinner />}
        </Layout>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);

import { ChakraProvider } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import '@fontsource/inter/400.css';
import '@fontsource/nunito/400.css';
import 'flatpickr/dist/themes/material_green.css';
import 'focus-visible/dist/focus-visible';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import GlobalSpinner from 'src/components/common/Spinner/GlobalSpinner';
import Layout from 'src/layout';
import 'src/libs/firebase';
import { UserService } from 'src/services/user';
import { wrapper } from 'src/store';
import { AuthActions } from 'src/store/auth/action';
import { ModalActions } from 'src/store/modal/action';
import { storage } from 'src/utils/storage';
import theme from 'src/utils/theme';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/globals.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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

  useEffect(() => {
    const verifyUser = async () => {
      if (storage.getToken()) {
        dispatch(AuthActions.setCurrentUserAction());
        dispatch(ModalActions.setModalOn());
        await UserService.getInfo()
          .then(res => {
            dispatch(AuthActions.setCurrentUserSuccessAction(res.data));
          })
          .catch(e => dispatch(AuthActions.setCurrentUserFailedAction()))
          .finally(() => {
            dispatch(ModalActions.setModalOff());
          });
      }
    };
    verifyUser();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Global styles={GlobalStyles} />
        <Layout>
          <Component {...pageProps} />
          {globalLoading && <GlobalSpinner />}
        </Layout>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);

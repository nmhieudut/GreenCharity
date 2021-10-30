import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/nunito/400.css";
import "flatpickr/dist/themes/material_green.css";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "src/layout";
import "src/libs/firebase";
import { AuthService } from "src/services/auth";
import { wrapper } from "src/store";
import { AuthActions } from "src/store/auth/action";
import theme from "src/utils/theme";
import "focus-visible/dist/focus-visible";
import "../styles/globals.scss";
import { Global, css } from "@emotion/react";
import { LSManager } from "src/utils/localstorage";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const GlobalStyles = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (LSManager.getToken()) {
      AuthService.verifyUser()
        .then(res => {
          dispatch(AuthActions.setCurrentUserAction(res.data));
        })
        .catch(e => dispatch(AuthActions.setCurrentUserAction(null)));
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);

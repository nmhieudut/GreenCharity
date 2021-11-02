import { ChakraProvider } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import "@fontsource/nunito/400.css";
import "flatpickr/dist/themes/material_green.css";
import "focus-visible/dist/focus-visible";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "src/layout";
import "src/libs/firebase";
import { UserService } from "src/services/user";
import { wrapper } from "src/store";
import { AuthActions } from "src/store/auth/action";
import { LSManager } from "src/utils/storage";
import theme from "src/utils/theme";
import "../styles/globals.scss";

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
      UserService.getInfo()
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

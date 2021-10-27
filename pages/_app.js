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
import "../styles/globals.scss";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  useEffect(() => {
    AuthService.verify()
      .then(res => {
        dispatch(AuthActions.setCurrentUserAction(res.data));
      })
      .catch(e => console.log(e));
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);

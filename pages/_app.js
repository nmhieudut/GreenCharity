import { ChakraProvider } from "@chakra-ui/react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "src/layout";
import "src/libs/firebase";
import { Verify } from "src/services/auth";
import { wrapper } from "src/store";
import { AuthActions } from "src/store/auth/action";
import theme from "src/utils/theme";
import "../styles/globals.scss";
import "flatpickr/dist/themes/material_green.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  useEffect(() => {
    Verify()
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

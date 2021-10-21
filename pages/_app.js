import "@fontsource/raleway/700.css";
import "@fontsource/be-vietnam/500.css";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Rest from "src/api";
import Layout from "src/layout";
import "src/libs/firebase";
import { wrapper } from "src/store";
import { actionTypes } from "src/store/auth/types";
import theme from "src/utils/theme";
import "../styles/globals.scss";
import { Verify } from "src/services/auth";
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log("---herer");
  //   try {
  //     Verify.then(res => {
  //       dispatch(AuthActions.setCurrentUserAction(res.data.user));
  //     });
  //   } catch (e) {}
  // }, []);
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);

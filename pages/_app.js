import { ChakraProvider } from "@chakra-ui/react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Layout from "src/layout";
import "src/libs/firebase";
import { wrapper } from "src/store";
import "../styles/globals.scss";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);

import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";
import NeedLogin from "src/components/common/NeedLogin";

export default function Account() {
  const user = useSelector(state => state.auth.currentUser);
  return (
    <>
      <Head>
        <title>Tài khoản</title>
        <link rel="icon" href="/images/thumbnail.png" />
      </Head>
      {user ? (
        <div>Tai khoan </div>
      ) : (
        <Box h={"100vh"}>
          <NeedLogin />
        </Box>
      )}
    </>
  );
}

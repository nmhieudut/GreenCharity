import {
  Box,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";
import NeedLogin from "src/components/common/NeedLogin";
import SectionContainer from "src/components/common/SectionContainer";
import { color } from "src/constants/color";

function AccountPage({ user }) {
  console.log("----info", user);
  return (
    <SectionContainer>
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box display="flex" flex="1" marginRight="3" alignItems="center">
          <Box
            width={{ base: "100%", sm: "85%" }}
            zIndex="2"
            marginLeft={{ base: "0", sm: "5%" }}
            marginTop="5%"
          >
            <Image
              width="300px"
              height="auto"
              src={user.picture}
              alt={user.name}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="3"
          flexDirection="column"
          justifyContent="start"
          marginTop={{ base: "3", sm: "0" }}
        >
          <Text as="b" fontSize={"3xl"} color={color.PRIMARY}>
            {user.name}
          </Text>
          <Text as="b" fontSize={"3xl"} color={color.PRIMARY}>
            {user.phoneNumber}
          </Text>
          <Text as="b" fontSize={"3xl"} color={color.PRIMARY}>
            {user.name}
          </Text>
        </Box>
      </Box>
    </SectionContainer>
  );
}

export default function Account() {
  const user = useSelector(state => state.auth.currentUser);
  return (
    <>
      <Head>
        <title>Tài khoản</title>
        <link rel="icon" href="/images/thumbnail.png" />
      </Head>
      {user ? (
        <AccountPage user={user} />
      ) : (
        <Box h={"100vh"}>
          <NeedLogin />
        </Box>
      )}
    </>
  );
}

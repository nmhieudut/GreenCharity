import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import NeedLogin from "src/components/common/NeedLogin";
const withAuth = WrappedComponent => {
  return props => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const user = useSelector(state => state.auth.currentUser);
      if (!user) {
        return (
          <Box h={"100vh"}>
            <NeedLogin />
          </Box>
        );
      }

      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withAuth;

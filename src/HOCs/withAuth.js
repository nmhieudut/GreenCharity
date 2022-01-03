import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import NeedLogin from 'src/components/common/NeedLogin';
const withAuth = WrappedComponent => {
  return props => {
    // checks whether we are on client / browser or server.
    const user = useSelector(state => state.auth.currentUser);
    const loading = useSelector(state => state.auth.loading);
    if (loading && !user) return <div>Loading.....</div>;
    if (!user && !loading) {
      return (
        <Box h={'100vh'}>
          <NeedLogin hasHeader />
        </Box>
      );
    }
    return <WrappedComponent {...props} user={user} />;
  };
};

export default withAuth;

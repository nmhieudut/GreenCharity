import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import NeedLogin from 'src/components/common/NeedLogin';
const withAuth = WrappedComponent => {
  return props => {
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

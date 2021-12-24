import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import NeedLogin from 'src/components/common/NeedLogin';
import Loading from 'src/components/common/Spinner/Loading';
const withAdmin = WrappedComponent => {
  return props => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const router = useRouter();
      const user = useSelector(state => state.auth.currentUser);
      const loading = useSelector(state => state.auth.loading);
      if (loading && !user) return <Loading />;
      if (!user && !loading) {
        return (
          <Box h={'100vh'}>
            <NeedLogin hasHeader />
          </Box>
        );
      }
      if (user && user.role !== 'admin') {
        router.push('/');
      }
      return <WrappedComponent {...props} user={user} />;
    }
    return null;
  };
};

export default withAdmin;

import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import NeedLogin from 'src/components/common/NeedLogin';
import Loading from 'src/components/common/Spinner/Loading';
const withAdmin = WrappedComponent => {
  return props => {
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
      router.replace('/404');
    }
    if (user && user.role === 'admin') {
      return <WrappedComponent {...props} user={user} />;
    }
    return null;
  };
};

export default withAdmin;

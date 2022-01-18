import React from 'react';
import { useQuery } from 'react-query';
import withAdmin from 'src/HOCs/withAdmin';
import AdminLayout from 'src/layout/AdminLayout';
import { AdminService } from 'src/services/admin';

function Auctions() {
  const { data, isLoading, isError } = useQuery('auctions', () =>
    AdminService.getAuctions()
  );
  const { transactions } = data || {};

  const bg = useColorModeValue('gray.100', 'gray.800');
  return <AdminLayout></AdminLayout>;
}
export default withAdmin(Auctions);

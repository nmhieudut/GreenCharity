import React from 'react';
import withAdmin from 'src/HOCs/withAdmin';
import AdminLayout from 'src/layout/AdminLayout';
import { AdminService } from 'src/services/admin';

function Donations() {
  const { data, isLoading, isError, error } = useQuery('donations', () =>
    AdminService.getDonations()
  );
  const { donations } = data || {};
  return <AdminLayout></AdminLayout>;
}
export default withAdmin(Donations);

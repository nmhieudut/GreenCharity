import React from 'react';
import withAdmin from 'src/HOCs/withAdmin';
import AdminLayout from 'src/layout/AdminLayout';

function Transactions() {
  return <AdminLayout></AdminLayout>;
}
export default withAdmin(Transactions);

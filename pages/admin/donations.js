import React from 'react';
import withAdmin from 'src/HOCs/withAdmin';
import AdminLayout from 'src/layout/AdminLayout';

function Donations() {
  return <AdminLayout></AdminLayout>;
}
export default withAdmin(Donations);

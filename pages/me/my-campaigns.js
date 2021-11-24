import React from 'react';
import withAuth from 'src/HOCs/withAuth';
import MeLayout from 'src/layout/MeLayout';

function MyCampaigns() {
  return <MeLayout>My Campaign</MeLayout>;
}

export default withAuth(MyCampaigns);

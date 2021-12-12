import React from 'react';
import { useQuery } from 'react-query';
import { newsService } from 'src/services/news';

export default function News() {
  const { data, isLoading, isError, error } = useQuery('news', () =>
    newsService.fetchAll()
  );
  console.log('---data', data);
  return <div>Tin tức</div>;
}

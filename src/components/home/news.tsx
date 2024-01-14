'use client';
import { useQuery } from 'react-query';

import Filter from '@/components/ui/filter';
import Pagination from '../ui/pagination';
import NewsCard from './news-card';
import NewsLoading from './news-loading';
import NoNewsFound from './no-found-news';
import Error from '@/app/error';

import useFilters from '@/hooks/useFilter';

import { getNews } from '@/features/news';

import { NewsResult } from '@/app/types';

const News: React.FC<NewsResult> = (props) => {
  const { totalPages, page, results } = props;
  const {
    queryFilterState,
    helperState,
    methods: {
      nextPageHandler,
      prevPageHandler,
      searchHandler,
      sortByHandler,
      sortForHandler,
      customDateRangeHandler,
      clearFilterHandler,
    },
  } = useFilters();

  const queryParams = {
    queryFilters: queryFilterState,
    sortBy: helperState.sorBy,
  };
  const { isError, isFetching, isSuccess, error, data } = useQuery({
    queryKey: ['news', queryParams],
    queryFn: () => getNews(queryParams),
    enabled: !helperState.firstRender,
    refetchOnWindowFocus: false,
  });

  const dateRange = {
    from: helperState.dateFrom
      ? new Date(helperState.dateFrom * 1000)
      : undefined,
    to: helperState.dateTo ? new Date(helperState.dateTo * 1000) : undefined,
  };

  if (isError) {
    return <Error error={error} />;
  }

  const newsData = isSuccess ? data.results : results;
  const totalNewsPages = isSuccess ? data.totalPages : totalPages;

  return (
    <>
      <Filter
        firstRender={helperState.firstRender}
        search={helperState.query}
        onSearch={searchHandler}
        sortByValue={helperState.sorBy}
        onSortBy={sortByHandler}
        sortForValue={helperState.sortFor}
        onSortFor={sortForHandler}
        dateRange={dateRange}
        onDateRange={customDateRangeHandler}
        onClear={clearFilterHandler}
      />
      {isFetching && <NewsLoading />}
      {isSuccess && !newsData.length && <NoNewsFound />}
      {!isFetching &&
        !!newsData.length &&
        newsData.map((news) => {
          return <NewsCard key={news.id} {...news} />;
        })}

      {!!newsData.length && !!totalNewsPages && (
        <Pagination
          onNext={nextPageHandler}
          onPrev={prevPageHandler}
          totalPages={totalNewsPages}
          currentPage={queryFilterState.page + 1}
        />
      )}
    </>
  );
};

export default News;

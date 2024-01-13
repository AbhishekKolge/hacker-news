'use client';
import Filter from '@/components/ui/filter';
import Pagination from '../ui/pagination';
import NewsCard from './news-card';

import useFilters from '@/hooks/useFilter';

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
    },
  } = useFilters();

  const dateRange = {
    from: helperState.dateFrom
      ? new Date(helperState.dateFrom * 1000)
      : undefined,
    to: helperState.dateTo ? new Date(helperState.dateTo * 1000) : undefined,
  };

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
      />
      {results.map((news) => {
        return <NewsCard key={news.id} {...news} />;
      })}
      {totalPages && (
        <Pagination
          onNext={nextPageHandler}
          onPrev={prevPageHandler}
          totalPages={totalPages}
          currentPage={queryFilterState.page + 1}
        />
      )}
    </>
  );
};

export default News;

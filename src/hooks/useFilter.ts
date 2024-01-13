import { useReducer, useEffect, Reducer, ChangeEvent } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { SelectRangeEventHandler } from 'react-day-picker';

import {
  SORT_BY,
  SORT_FOR,
  DAY,
  WEEK,
  MONTH,
  YEAR,
  NEWS_FILTER,
} from '@/utils/defaults';
import { pickExactObjKeys } from '@/utils/helper';

import { useDebouncedCallback } from './useOptmization';

import {
  FilterState,
  HelperState,
  QueryFilterAction,
  HelperAction,
} from './types';

const initialFilterState: FilterState = NEWS_FILTER;

const initialHelperState: HelperState = {
  query: '',
  dateFrom: null,
  dateTo: null,
  sorBy: SORT_BY[0].value,
  sortFor: SORT_FOR[0].value,
  firstRender: true,
};

const queryFilterReducer: Reducer<FilterState, QueryFilterAction> = (
  state,
  action
) => {
  if (action.type === 'SET_FILTERS') {
    return {
      ...state,
      ...action.filters,
    };
  }
  if (action.type === 'CHANGE_PAGE') {
    return {
      ...state,
      page: action.page,
    };
  }
  if (action.type === 'SET_QUERY') {
    return {
      ...state,
      page: initialFilterState.page,
      query: action.query,
    };
  }
  if (action.type === 'SET_NUMERIC_FILTERS') {
    return {
      ...state,
      page: initialFilterState.page,
      numericFilters: action.numericFilters,
    };
  }
  return initialFilterState;
};

const helperReducer: Reducer<HelperState, HelperAction> = (state, action) => {
  if (action.type === 'SET_FIRST_RENDER') {
    return {
      ...state,
      firstRender: action.status,
    };
  }
  if (action.type === 'SET_HELPERS') {
    return {
      ...state,
      ...action.helpers,
    };
  }
  if (action.type === 'SET_QUERY') {
    return {
      ...state,
      query: action.query,
    };
  }
  if (action.type === 'SET_RANGE') {
    return {
      ...state,
      dateFrom: action.dateFrom,
      dateTo: action.dateTo,
    };
  }
  if (action.type === 'SET_SORT_BY') {
    return {
      ...state,
      sorBy: action.sorBy,
    };
  }
  if (action.type === 'SET_SORT_FOR') {
    return {
      ...state,
      dateFrom: action.dateFrom || null,
      dateTo: action.dateTo || null,
      sortFor: action.sortFor,
    };
  }
  return initialHelperState;
};

const useFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialFilterState
  );
  const [helperState, dispatchHelper] = useReducer(
    helperReducer,
    initialHelperState
  );

  const nextPageHandler = () => {
    dispatchQueryFilter({
      type: 'CHANGE_PAGE',
      page: queryFilterState.page + 1,
    });
  };

  const prevPageHandler = () => {
    dispatchQueryFilter({
      type: 'CHANGE_PAGE',
      page: queryFilterState.page - 1,
    });
  };

  const debouncedHandleSearch = useDebouncedCallback((query: string) => {
    dispatchQueryFilter({ type: 'SET_QUERY', query });
  });

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    dispatchHelper({ type: 'SET_QUERY', query });
    debouncedHandleSearch(query);
  };

  const sortByHandler = (sorBy: string) => {
    dispatchHelper({ type: 'SET_SORT_BY', sorBy });
  };

  const sortForHandler = (value: string) => {
    switch (value) {
      case 'all': {
        dispatchHelper({
          type: 'SET_SORT_FOR',
          sortFor: value,
          dateFrom: null,
          dateTo: null,
        });
        dispatchQueryFilter({
          type: 'SET_NUMERIC_FILTERS',
          numericFilters: '',
        });
        break;
      }
      case 'day': {
        const dateFrom = ~~((Date.now() - DAY) / 1000);
        dispatchHelper({
          type: 'SET_SORT_FOR',
          sortFor: value,
          dateFrom,
          dateTo: null,
        });
        dispatchQueryFilter({
          type: 'SET_NUMERIC_FILTERS',
          numericFilters: `created_at_i>${dateFrom}`,
        });
        break;
      }
      case 'week': {
        const dateFrom = ~~((Date.now() - WEEK) / 1000);
        dispatchHelper({
          type: 'SET_SORT_FOR',
          sortFor: value,
          dateFrom,
          dateTo: null,
        });
        dispatchQueryFilter({
          type: 'SET_NUMERIC_FILTERS',
          numericFilters: `created_at_i>${dateFrom}`,
        });
        break;
      }
      case 'month': {
        const dateFrom = ~~(MONTH / 1000);
        dispatchHelper({
          type: 'SET_SORT_FOR',
          sortFor: value,
          dateFrom,
          dateTo: null,
        });
        dispatchQueryFilter({
          type: 'SET_NUMERIC_FILTERS',
          numericFilters: `created_at_i>${dateFrom}`,
        });
        break;
      }
      case 'year': {
        const dateFrom = ~~(YEAR / 1000);
        dispatchHelper({
          type: 'SET_SORT_FOR',
          sortFor: value,
          dateFrom,
          dateTo: null,
        });
        dispatchQueryFilter({
          type: 'SET_NUMERIC_FILTERS',
          numericFilters: `created_at_i>${dateFrom}`,
        });
        break;
      }
      default: {
        dispatchHelper({
          type: 'SET_SORT_FOR',
          sortFor: value,
          dateFrom: null,
          dateTo: null,
        });
        dispatchQueryFilter({
          type: 'SET_NUMERIC_FILTERS',
          numericFilters: '',
        });
        break;
      }
    }
  };

  const customDateRangeHandler: SelectRangeEventHandler = (value) => {
    const dateFrom = value?.from
      ? ~~(new Date(value.from).getTime() / 1000)
      : null;
    const dateTo = value?.to ? ~~(new Date(value.to).getTime() / 1000) : null;

    let numericFilters: string[] = [];

    if (dateFrom) {
      numericFilters.push(`created_at_i>${dateFrom}`);
    }

    if (dateTo) {
      numericFilters.push(`created_at_i<${dateTo}`);
    }

    dispatchHelper({
      type: 'SET_SORT_FOR',
      sortFor: null,
      dateFrom,
      dateTo,
    });

    dispatchQueryFilter({
      type: 'SET_NUMERIC_FILTERS',
      numericFilters: numericFilters.join(','),
    });
  };

  const buildQueryParamHandler = (name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);
    return params.toString();
  };

  useEffect(() => {
    if (helperState.firstRender) {
      const queryParamsFilter = JSON.parse(searchParams.get('filter') ?? '{}');
      const helperParamsState = JSON.parse(searchParams.get('state') ?? '{}');

      const filters: FilterState = pickExactObjKeys(
        queryParamsFilter,
        Object.keys(queryFilterState) as (keyof FilterState)[]
      ) as FilterState;

      const helpers: HelperState = pickExactObjKeys(
        helperParamsState,
        Object.keys(helperState) as (keyof HelperState)[]
      ) as HelperState;

      dispatchQueryFilter({
        type: 'SET_FILTERS',
        filters,
      });
      dispatchHelper({ type: 'SET_HELPERS', helpers });
      dispatchHelper({ type: 'SET_FIRST_RENDER', status: false });
    }
  }, [helperState.firstRender, searchParams, queryFilterState, helperState]);

  useEffect(() => {
    if (!helperState.firstRender) {
      const updatedQuery = buildQueryParamHandler(
        'filter',
        JSON.stringify(queryFilterState)
      );

      const updatedState = buildQueryParamHandler(
        'state',
        JSON.stringify(helperState)
      );

      router.replace(`${pathname}?${updatedQuery}&${updatedState}`);
    }
  }, [helperState, queryFilterState, pathname, router]);

  return {
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
  };
};

export default useFilters;

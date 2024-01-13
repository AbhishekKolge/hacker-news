export interface FilterState {
  query: string;
  page: number;
  tags: string;
  numericFilters: string;
}

export interface HelperState {
  query: string;
  dateFrom: number | null;
  dateTo: number | null;
  sorBy: string;
  sortFor: string | null;
  firstRender: boolean;
}

interface SetFiltersAction {
  type: 'SET_FILTERS';
  filters: FilterState;
}

interface ChangePageAction {
  type: 'CHANGE_PAGE';
  page: number;
}

interface SetQueryAction {
  type: 'SET_QUERY';
  query: string;
}

interface SetNumericFiltersAction {
  type: 'SET_NUMERIC_FILTERS';
  numericFilters: string;
}

interface SetRangeAction {
  type: 'SET_RANGE';
  dateFrom: number;
  dateTo: number;
}

interface SetSortByAction {
  type: 'SET_SORT_BY';
  sorBy: string;
}

interface SetSortForAction {
  type: 'SET_SORT_FOR';
  sortFor: string | null;
  dateFrom: number | null;
  dateTo: number | null;
}

interface SetHelperAction {
  type: 'SET_HELPERS';
  helpers: HelperState;
}

interface SetFirstRenderAction {
  type: 'SET_FIRST_RENDER';
  status: boolean;
}

export type QueryFilterAction =
  | SetFiltersAction
  | ChangePageAction
  | SetQueryAction
  | SetNumericFiltersAction;

export type HelperAction =
  | SetRangeAction
  | SetQueryAction
  | SetSortByAction
  | SetSortForAction
  | SetHelperAction
  | SetFirstRenderAction;

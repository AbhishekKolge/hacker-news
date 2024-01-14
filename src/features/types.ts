import { FilterState } from '@/hooks/types';

export interface getNewsParams {
  queryFilters: FilterState;
  sortBy: string;
}

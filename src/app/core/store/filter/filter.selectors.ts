import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromFilter from './filter.reducer';

export const selectFilter = createFeatureSelector<fromFilter.IState>('filter');
export const selectFilterIds = createSelector(selectFilter, fromFilter.selectIds);
export const selectFilterEntities = createSelector(selectFilter, fromFilter.selectEntities);
export const selectFilterTotal = createSelector(selectFilter, fromFilter.selectTotal);
export const selectFilterAll = createSelector(selectFilter, fromFilter.selectAll);

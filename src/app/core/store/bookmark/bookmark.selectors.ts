import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromBookmark from './bookmark.reducer';

export const selectBookmark = createFeatureSelector<fromBookmark.IState>('bookmark');
export const selectBookmarkIds = createSelector(selectBookmark, fromBookmark.selectIds);
export const selectBookmarkEntities = createSelector(selectBookmark, fromBookmark.selectEntities);
export const selectBookmarkTotal = createSelector(selectBookmark, fromBookmark.selectTotal);
export const selectBookmarkAll = createSelector(selectBookmark, fromBookmark.selectAll);

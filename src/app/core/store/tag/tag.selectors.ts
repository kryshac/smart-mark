import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTag from './tag.reducer';

export const selectTag = createFeatureSelector<fromTag.IState>('tag');
export const selectTagIds = createSelector(selectTag, fromTag.selectIds);
export const selectTagEntities = createSelector(selectTag, fromTag.selectEntities);
export const selectTagTotal = createSelector(selectTag, fromTag.selectTotal);
export const selectTagAll = createSelector(selectTag, fromTag.selectAll);

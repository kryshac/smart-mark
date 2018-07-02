import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { IFilter } from '@app/shared/models';
import * as actions from './filter.actions';

export interface IState extends EntityState<IFilter> {}

export const todoAdapter: EntityAdapter<IFilter> = createEntityAdapter<IFilter>();

export const initialState: IState = todoAdapter.getInitialState({});

export function reducerFilter(state = initialState, action: actions.ActionsUnion): IState {
  switch (action.type) {
    case actions.Actions.Add: {
      return todoAdapter.addOne(action.payload, {
        ...state,
      });
    }

    case actions.Actions.Remove: {
      return todoAdapter.removeOne(action.payload.id, {
        ...state,
      });
    }

    default: {
      return state;
    }
  }
}

export const { selectIds, selectEntities, selectTotal, selectAll } = todoAdapter.getSelectors();

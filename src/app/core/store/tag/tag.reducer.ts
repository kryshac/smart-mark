import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { ITag } from '@app/shared/models';
import * as actions from './tag.actions';

export interface IState extends EntityState<ITag> {
  inProgress: boolean;
  error: string;
}

export const todoAdapter: EntityAdapter<ITag> = createEntityAdapter<ITag>();

export const initialState: IState = todoAdapter.getInitialState({
  inProgress: false,
  error: null,
});

export function reducerTag(state = initialState, action: actions.ActionsUnion): IState {
  switch (action.type) {
    case actions.Actions.Add:
    case actions.Actions.Update:
    case actions.Actions.Remove:
    case actions.Actions.Load: {
      return {
        ...state,
        inProgress: true,
      };
    }

    case actions.Actions.AddFail:
    case actions.Actions.UpdateFail:
    case actions.Actions.RemoveFail:
    case actions.Actions.LoadFail: {
      return {
        ...state,
        inProgress: false,
        error: action.payload,
      };
    }

    case actions.Actions.LoadSuccess: {
      return todoAdapter.addMany(action.payload, {
        ...state,
        inProgress: false,
        error: null,
      });
    }

    case actions.Actions.AddSuccess:
    case actions.Actions.SubscriptionAdd: {
      return todoAdapter.addOne(action.payload, {
        ...state,
        inProgress: false,
      });
    }

    case actions.Actions.UpdateSuccess: {
      return todoAdapter.updateOne(
        {
          id: action.payload.id,
          changes: action.payload,
        },
        {
          ...state,
          inProgress: false,
        },
      );
    }

    case actions.Actions.RemoveSuccess:
    case actions.Actions.SubscriptionRemove: {
      return todoAdapter.removeOne(action.payload.id, {
        ...state,
        inProgress: false,
      });
    }

    default: {
      return state;
    }
  }
}

export const getInProgress = (state: IState) => state.inProgress;
export const getError = (state: IState) => state.error;

export const { selectIds, selectEntities, selectTotal, selectAll } = todoAdapter.getSelectors();

import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

// tslint:disable-next-line:no-empty-interface
export interface IState {}
export const reducers: ActionReducerMap<IState> = {};

// console.log all actions
export function logger(reducer: ActionReducer<IState>): ActionReducer<IState> {
  return (state: IState, action: any): IState => {
    // console.log('state', state);
    // console.log('action', action);

    return reducer(state, action);
  };
}
// tslint:disable-next-line:array-type
export const metaReducers: MetaReducer<IState>[] = [logger, storeFreeze];

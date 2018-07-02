import { Action } from '@ngrx/store';

import { IFilter } from '@app/shared/models';

export enum Actions {
  Add = '[Filter] Add',
  Remove = '[Filter] Remove',
}

export class Add implements Action {
  public readonly type = Actions.Add;
  constructor(public payload: IFilter) {}
}

export class Remove implements Action {
  public readonly type = Actions.Remove;

  constructor(public payload: IFilter) {}
}

export type ActionsUnion = Add | Remove;

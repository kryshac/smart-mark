import { Action } from '@ngrx/store';

import { ITag } from '@app/shared/models';

export enum Actions {
  Load = '[Tag] Load',
  LoadSuccess = '[Tag] Load Success',
  LoadFail = '[Tag] Load Fail',
  Add = '[Tag] Add',
  AddSuccess = '[Tag] Add Success',
  AddFail = '[Tag] Add Fail',
  Remove = '[Tag] Remove',
  RemoveSuccess = '[Tag] Remove Success',
  RemoveFail = '[Tag] Remove Fail',
  Update = '[Tag] Update',
  UpdateSuccess = '[Tag] Update Success',
  UpdateFail = '[Tag] Update Fail',
  AddUpdateMultiple = '[Tag] Add or Update multiple',
  SubscriptionAdd = '[Tag] Subscription Add',
  SubscriptionRemove = '[Tag] Subscription Remove',
}

export class Load implements Action {
  public readonly type = Actions.Load;

  constructor(public payload?: string) {}
}

export class LoadSuccess implements Action {
  public readonly type = Actions.LoadSuccess;

  constructor(public payload?: ITag[]) {}
}

export class LoadFail implements Action {
  public readonly type = Actions.LoadFail;

  constructor(public payload?: string) {}
}

export class Add implements Action {
  public readonly type = Actions.Add;
  constructor(public payload: ITag) {}
}

export class AddSuccess implements Action {
  public readonly type = Actions.AddSuccess;
  constructor(public payload: ITag) {}
}

export class AddFail implements Action {
  public readonly type = Actions.AddFail;

  constructor(public payload?: any) {}
}

export class Remove implements Action {
  public readonly type = Actions.Remove;

  constructor(public payload: Partial<ITag>) {}
}

export class RemoveSuccess implements Action {
  public readonly type = Actions.RemoveSuccess;

  constructor(public payload: ITag) {}
}

export class RemoveFail implements Action {
  public readonly type = Actions.RemoveFail;

  constructor(public payload?: any) {}
}

export class Update implements Action {
  public readonly type = Actions.Update;

  constructor(public payload: ITag) {}
}

export class UpdateSuccess implements Action {
  public readonly type = Actions.UpdateSuccess;

  constructor(public payload: ITag) {}
}

export class UpdateFail implements Action {
  public readonly type = Actions.UpdateFail;

  constructor(public payload?: any) {}
}

export class AddUpdateMultiple implements Action {
  public readonly type = Actions.AddUpdateMultiple;

  constructor(public payload: ITag[]) {}
}

export class SubscriptionAdd implements Action {
  public readonly type = Actions.SubscriptionAdd;

  constructor(public payload: ITag) {}
}

export class SubscriptionRemove implements Action {
  public readonly type = Actions.SubscriptionRemove;

  constructor(public payload: Partial<ITag>) {}
}

export type ActionsUnion =
  | Add
  | AddSuccess
  | AddFail
  | Remove
  | RemoveSuccess
  | RemoveFail
  | Update
  | UpdateSuccess
  | UpdateFail
  | AddUpdateMultiple
  | Load
  | LoadSuccess
  | LoadFail
  | SubscriptionAdd
  | SubscriptionRemove;

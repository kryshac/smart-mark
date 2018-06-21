import { Action } from '@ngrx/store';

import { IBookmark } from '@app/core';

export enum Actions {
  Load = '[Bookmark] Load',
  LoadSuccess = '[Bookmark] Load Success',
  LoadFail = '[Bookmark] Load Fail',
  Add = '[Bookmark] Add',
  AddSuccess = '[Bookmark] Add Success',
  AddFail = '[Bookmark] Add Fail',
  Remove = '[Bookmark] Remove',
  RemoveSuccess = '[Bookmark] Remove Success',
  RemoveFail = '[Bookmark] Remove Fail',
  Update = '[Bookmark] Update',
  UpdateSuccess = '[Bookmark] Update Success',
  UpdateFail = '[Bookmark] Update Fail',
  SubscriptionAdd = '[Bookmark] Subscription Add',
  SubscriptionRemove = '[Bookmark] Subscription Remove',
}

export class Load implements Action {
  public readonly type = Actions.Load;

  constructor(public payload?: string) {}
}

export class LoadSuccess implements Action {
  public readonly type = Actions.LoadSuccess;

  constructor(public payload?: IBookmark[]) {}
}

export class LoadFail implements Action {
  public readonly type = Actions.LoadFail;

  constructor(public payload?: string) {}
}

export class Add implements Action {
  public readonly type = Actions.Add;
  constructor(public payload: Partial<IBookmark>) {}
}

export class AddSuccess implements Action {
  public readonly type = Actions.AddSuccess;
  constructor(public payload: IBookmark) {}
}

export class AddFail implements Action {
  public readonly type = Actions.AddFail;

  constructor(public payload?: any) {}
}

export class Remove implements Action {
  public readonly type = Actions.Remove;

  constructor(public payload: Partial<IBookmark>) {}
}

export class RemoveSuccess implements Action {
  public readonly type = Actions.RemoveSuccess;

  constructor(public payload: IBookmark) {}
}

export class RemoveFail implements Action {
  public readonly type = Actions.RemoveFail;

  constructor(public payload?: any) {}
}

export class Update implements Action {
  public readonly type = Actions.Update;

  constructor(public payload: IBookmark) {}
}

export class UpdateSuccess implements Action {
  public readonly type = Actions.UpdateSuccess;

  constructor(public payload: IBookmark) {}
}

export class UpdateFail implements Action {
  public readonly type = Actions.UpdateFail;

  constructor(public payload?: any) {}
}

export class SubscriptionAdd implements Action {
  public readonly type = Actions.SubscriptionAdd;

  constructor(public payload: IBookmark) {}
}

export class SubscriptionRemove implements Action {
  public readonly type = Actions.SubscriptionRemove;

  constructor(public payload: Partial<IBookmark>) {}
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
  | Load
  | LoadSuccess
  | LoadFail
  | SubscriptionAdd
  | SubscriptionRemove;

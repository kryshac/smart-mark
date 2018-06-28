import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Action } from '@ngrx/store';

import { ITag } from '@app/shared/models';
import * as actions from './tag.actions';
import { ServiceTag } from './tag.services';

@Injectable()
export class EffectsTag {
  @Effect()
  public getAll$: Observable<Action> = this._actions$.pipe(
    ofType<actions.Load>(actions.Actions.Load),
    switchMap(() =>
      this._service.getAll().pipe(
        map((response: ITag[]) => new actions.LoadSuccess(response)),
        catchError((err: any) => of(new actions.LoadFail(err))),
      ),
    ),
  );

  // @Effect()
  // public add$: Observable<Action> = this._actions$.pipe(
  //   ofType<actions.Add>(actions.Actions.Add),
  //   map((action: actions.Add) => action.payload),
  //   switchMap((payload: Partial<ITag>) =>
  //     this._service.add(payload).pipe(
  //       map((respones: ITag) => new actions.AddSuccess(respones)),
  //       catchError((err: any) => of(new actions.AddFail(err))),
  //     ),
  //   ),
  // );

  // @Effect()
  // public update$: Observable<Action> = this._actions$.pipe(
  //   ofType<actions.Update>(actions.Actions.Update),
  //   map((action: actions.Update) => action.payload),
  //   switchMap((payload: ITag) =>
  //     this._service.update(payload).pipe(
  //       map((response: ITag) => new actions.UpdateSuccess(response)),
  //       catchError((err: any) => of(new actions.UpdateFail(err))),
  //     ),
  //   ),
  // );

  // @Effect()
  // public delete$: Observable<Action> = this._actions$.pipe(
  //   ofType<actions.Remove>(actions.Actions.Remove),
  //   map((action: actions.Remove) => action.payload),
  //   switchMap((payload: ITag) =>
  //     this._service.delete(payload).pipe(
  //       map((response: '') => new actions.RemoveSuccess(payload)),
  //       catchError((err: any) => of(new actions.RemoveFail(err))),
  //     ),
  //   ),
  // );
  constructor(private _service: ServiceTag, private _actions$: Actions) {}
}

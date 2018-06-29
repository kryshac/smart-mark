import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { Action } from '@ngrx/store';

import { IBookmark, INewBookmark, ITag } from '@app/shared/models';
import * as actionsTag from '../tag/tag.actions';
import * as actions from './bookmark.actions';
import { ServiceBookmark } from './bookmark.services';

@Injectable()
export class EffectsBookmark {
  @Effect()
  public getAll$: Observable<Action> = this._actions$.pipe(
    ofType<actions.Load>(actions.Actions.Load),
    switchMap(() =>
      this._service.getAll().pipe(
        map((response: IBookmark[]) => new actions.LoadSuccess(response)),
        catchError((err: any) => of(new actions.LoadFail(err))),
      ),
    ),
  );

  @Effect()
  public add$: Observable<Action> = this._actions$.pipe(
    ofType<actions.Add>(actions.Actions.Add),
    map((action: actions.Add) => action.payload),
    switchMap((payload: INewBookmark) =>
      this._service.add(payload).pipe(
        tap(),
        mergeMap((response: IBookmark) => [
          new actionsTag.AddUpdateMultiple(response.tags as ITag[]),
          new actions.AddSuccess({
            ...response,
            tags: (response.tags as ITag[]).map(({ id }) => id),
          }),
        ]),
        // map((respones: IBookmark) => new actions.AddSuccess(respones)),
        catchError((err: any) => of(new actions.AddFail(err))),
      ),
    ),
  );

  @Effect()
  public subscriptionAdd$: Observable<Action> = this._actions$.pipe(
    ofType<actions.SubscriptionAdd>(actions.Actions.SubscriptionAdd),
    map((action: actions.SubscriptionAdd) => action.payload),
    map((response: IBookmark) => new actionsTag.AddUpdateMultiple(response.tags as ITag[])),
  );

  // @Effect()
  // public update$: Observable<Action> = this._actions$.pipe(
  //   ofType<actions.Update>(actions.Actions.Update),
  //   map((action: actions.Update) => action.payload),
  //   switchMap((payload: IBookmark) =>
  //     this._service.update(payload).pipe(
  //       map((response: IBookmark) => new actions.UpdateSuccess(response)),
  //       catchError((err: any) => of(new actions.UpdateFail(err))),
  //     ),
  //   ),
  // );

  @Effect()
  public delete$: Observable<Action> = this._actions$.pipe(
    ofType<actions.Remove>(actions.Actions.Remove),
    map((action: actions.Remove) => action.payload),
    switchMap((payload: IBookmark) =>
      this._service.delete(payload).pipe(
        map((response: IBookmark) => new actions.RemoveSuccess(response)),
        catchError((err: any) => of(new actions.RemoveFail(err))),
      ),
    ),
  );
  constructor(private _service: ServiceBookmark, private _actions$: Actions) {}
}

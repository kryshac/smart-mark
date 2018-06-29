import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Md5 } from 'ts-md5/dist/md5';

import * as GraphQl from '@app/core/services/graphql';
import { IState } from '@app/core/store';
import * as StoreBookmark from '@app/core/store/bookmark';
import * as StoreTag from '@app/core/store/tag';
import { IBookmark, ITag } from '@app/shared/models';
import { Dictionary } from '@ngrx/entity/src/models';
import { Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { feedAnimation } from './home.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [feedAnimation],
})
export class HomeComponent implements OnInit {
  public bookmarks$: Observable<IBookmark[]>;

  constructor(private _store: Store<IState>, private _apollo: Apollo) {}

  public ngOnInit() {
    this._store.dispatch(new StoreBookmark.Load());

    this.bookmarks$ = combineLatest(
      this._store.select(StoreBookmark.selectBookmarkAll),
      this._store.select(StoreTag.selectTagEntities),
    ).pipe(
      tap((data: any) => console.log(JSON.parse(JSON.stringify(data)))),
      // tap((combine: [IBookmark[], Dictionary<ITag>]) => {
      //   const test = combine[0].map((bookmark: IBookmark) => ({
      //     ...bookmark,
      //     tags: (bookmark.tags as ITag[])
      //       .map(({ id }) => combine[1][id])
      //       .filter((tag: ITag | undefined) => tag !== undefined),
      //   }));
      //   console.log(test);
      // }),
      map((combine: [IBookmark[], Dictionary<ITag>]) =>
        combine[0].map((bookmark: IBookmark) => ({
          ...bookmark,
          tags: (bookmark.tags as ITag[])
            .map(({ id }) => combine[1][id])
            .filter((tag: ITag | undefined) => tag !== undefined),
        })),
      ),
    );

    this.bookmarks$.subscribe((data) => console.log(data));

    this._apollo
      .subscribe({
        query: GraphQl.subscriptionBookmarkCreated,
      })
      .subscribe((queryResult: ApolloQueryResult<{ bookmarkCreated: IBookmark }>) => {
        this._store.dispatch(new StoreBookmark.SubscriptionAdd(queryResult.data.bookmarkCreated));
      });
  }

  public trackByFn(_, item: IBookmark) {
    return Md5.hashStr(JSON.stringify(item));
  }
}

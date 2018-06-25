import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
      map((combine: [IBookmark[], Dictionary<ITag>]) =>
        combine[0].map((bookmark: IBookmark) => ({
          ...bookmark,
          tags: (bookmark.tags as ITag[]).map(({ id }) => combine[1][id]),
        })),
      ),
    );

    this._apollo
      .subscribe({
        query: GraphQl.subscriptionBookmarkCreated,
      })
      .subscribe(
        (
          queryResult: ApolloQueryResult<{
            Bookmark: {
              node: IBookmark;
              previousValues: { id: string };
            };
          }>,
        ) => {
          console.log(queryResult);
          // if (queryResult.data.Bookmark.node) {
          //   this._store.dispatch(new StoreBookmark.
          // SubscriptionAdd(queryResult.data.Bookmark.node));
          // } else {
          //   this._store.dispatch(
          //     new StoreBookmark.SubscriptionRemove({
          //       id: queryResult.data.Bookmark.previousValues.id,
          //     }),
          //   );
          // }
        },
      );
  }
}

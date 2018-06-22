import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BreakpointsService } from '@app/core/services/breakpoints.service';
import * as GraphQl from '@app/core/services/graphql';
import { IBookmark } from '@app/core/shared/models';
import { IState } from '@app/core/store';
import * as StoreBookmark from '@app/core/store/bookmark';
import { Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public bookmarks$: Observable<IBookmark[]>;
  public cols: Observable<number>;

  constructor(
    private _store: Store<IState>,
    private _apollo: Apollo,
    private _breakpoints: BreakpointsService,
  ) {
    this.cols = this._breakpoints.cols;
  }

  public ngOnInit() {
    this._store.dispatch(new StoreBookmark.Load());

    this.bookmarks$ = this._store.select(StoreBookmark.selectBookmarkAll);

    this._apollo
      .subscribe({
        query: GraphQl.bookmarkMutation,
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
          if (queryResult.data.Bookmark.node) {
            this._store.dispatch(new StoreBookmark.SubscriptionAdd(queryResult.data.Bookmark.node));
          } else {
            this._store.dispatch(
              new StoreBookmark.SubscriptionRemove({
                id: queryResult.data.Bookmark.previousValues.id,
              }),
            );
          }
        },
      );
  }

  public getColor(): string {
    const color = ['#DDBDF1'];
    return color[Math.floor(Math.random() * color.length)];
  }
}

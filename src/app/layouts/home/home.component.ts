import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Md5 } from 'ts-md5/dist/md5';

import * as GraphQl from '@app/core/services/graphql';
import { IState } from '@app/core/store';
import * as StoreBookmark from '@app/core/store/bookmark';
import * as StoreFilter from '@app/core/store/filter';
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
      this._store.select(StoreBookmark.selectBookmarkAll) as Observable<IBookmark[]>,
      this._store.select(StoreTag.selectTagEntities) as Observable<Dictionary<ITag>>,
      this._store.select(StoreFilter.selectFilterIds) as Observable<string[]>,
    ).pipe(
      map(([bookmark, tag, filter]) => {
        const bookmarkTagDetail = this.addBookmarkTagsDetails(bookmark, tag);
        const bookmarkFilter = this.filterBookmarksByTags(bookmarkTagDetail, filter);
        const bookmarkSort = this.sortBookmarksByTags(bookmarkFilter, filter);

        return bookmarkSort;
      }),
    );

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

  private addBookmarkTagsDetails(bookmarks: IBookmark[], tags: Dictionary<ITag>): IBookmark[] {
    return bookmarks.map((bookmark: IBookmark) => ({
      ...bookmark,
      tags: (bookmark.tags as ITag[])
        .map(({ id }) => tags[id])
        .filter((tag: ITag | undefined) => tag !== undefined),
    }));
  }

  private filterBookmarksByTags(bookmarks: IBookmark[], filter: string[]): IBookmark[] {
    if (filter.length === 0) {
      return bookmarks;
    }

    return bookmarks.filter((bookmark: IBookmark) =>
      (bookmark.tags as ITag[]).reduce(
        (acc: boolean, tag: ITag) => acc || filter.includes(tag.id),
        false,
      ),
    );
  }

  private sortBookmarksByTags(bookmarks: IBookmark[], filter: string[]): IBookmark[] {
    if (filter.length === 0) {
      return bookmarks;
    }

    return bookmarks.sort((bookmarkA: IBookmark, bookmarkB: IBookmark) => {
      const tagsA = (bookmarkA.tags as ITag[]).filter(({ id }) => filter.includes(id));
      const tagsB = (bookmarkB.tags as ITag[]).filter(({ id }) => filter.includes(id));

      return tagsB.length - tagsA.length;
    });
  }
}

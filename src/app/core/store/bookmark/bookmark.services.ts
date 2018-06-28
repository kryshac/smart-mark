import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';

import * as GraphQl from '@app/core/services/graphql';
import { IBookmark, INewBookmark } from '@app/shared/models';

@Injectable()
export class ServiceBookmark {
  constructor(private _apollo: Apollo) {}

  public getAll(): Observable<IBookmark[]> {
    return new Observable((observer) => {
      return this._apollo
        .query({
          query: GraphQl.queryAllBookmarks,
        })
        .subscribe(
          (queryResult: ApolloQueryResult<{ allBookmarks: IBookmark[] }>) => {
            observer.next(queryResult.data.allBookmarks);
            observer.complete();
          },
          (err) => {
            observer.error(err);
          },
        );
    });
  }

  public add(newBookmarkInput: INewBookmark): Observable<IBookmark> {
    return new Observable((observer) => {
      return this._apollo
        .mutate({
          mutation: GraphQl.mutationCreateBookmark,
          variables: { newBookmarkInput },
        })
        .subscribe(
          (queryResult: ApolloQueryResult<{ createBookmark: IBookmark }>) => {
            observer.next(queryResult.data.createBookmark);
            observer.complete();
          },
          (err) => {
            observer.error(err);
          },
        );
    });
  }

  // public update({ id: idRest, ...rest }): Observable<IBookmark> {
  //   return new Observable((observer) => {
  //     return this.apiService
  //       .putHttp({ url: `${ApiUrls.urlBookmark}/${idRest}`, body: rest })
  //       .subscribe(
  //         (response: IBookmark) => {
  //           observer.next(response);
  //           observer.complete();
  //         },
  //         (err) => {
  //           observer.error(err);
  //         },
  //       );
  //   });
  // }

  public delete(bookmark: Partial<IBookmark>): Observable<any> {
    return new Observable((observer) => {
      return this._apollo
        .mutate({
          mutation: GraphQl.mutationDeleteBookmark,
          variables: { id: bookmark.id },
        })
        .subscribe(
          (queryResult: ApolloQueryResult<{ deleteBookmark: IBookmark }>) => {
            observer.next(queryResult.data.deleteBookmark);
            observer.complete();
          },
          (err) => {
            observer.error(err);
          },
        );
    });
  }
}

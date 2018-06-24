import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';

import * as GraphQl from '@app/core/services/graphql';
import { IBookmark } from '@app/shared/models';

@Injectable()
export class ServiceBookmark {
  constructor(private _apollo: Apollo) {}

  public getAll(): Observable<IBookmark[]> {
    return new Observable((observer) => {
      return this._apollo
        .query({
          query: GraphQl.getAllBookmarks,
        })
        .subscribe(
          (queryResult: ApolloQueryResult<{ allBookmarks: IBookmark[] }>) => {
            observer.next(queryResult.data.allBookmarks);
            observer.complete();
          },
          (err) => {
            console.log(err);
            observer.error(err);
          },
        );
    });
  }

  public add(bookmark: any): Observable<IBookmark> {
    return new Observable((observer) => {
      return this._apollo
        .mutate({
          mutation: GraphQl.createBookmark,
          variables: { ...bookmark },
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

  // public delete(type: any): Observable<any> {
  //   return new Observable((observer) => {
  //     return this.apiService.deleteHttp({ url: `${ApiUrls.urlBookmark}/${type.id}` }).subscribe(
  //       (response) => {
  //         observer.next(response);
  //         observer.complete();
  //       },
  //       (err) => {
  //         observer.error(err);
  //       },
  //     );
  //   });
  // }
}

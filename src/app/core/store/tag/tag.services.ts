import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';

import * as GraphQl from '@app/core/services/graphql';
import { ITag } from '@app/shared/models';

@Injectable()
export class ServiceTag {
  constructor(private _apollo: Apollo) {}

  public getAll(): Observable<ITag[]> {
    return new Observable((observer) => {
      return this._apollo
        .query({
          query: GraphQl.queryMyBookmarks,
        })
        .subscribe(
          (queryResult: ApolloQueryResult<{ myTags: { tag: ITag }[] }>) => {
            observer.next(queryResult.data.myTags.map(({ tag }) => ({ ...tag })));
            observer.complete();
          },
          (err) => {
            observer.error(err);
          },
        );
    });
  }

  // public add(newTagInput: ITag): Observable<ITag> {
  //   return new Observable((observer) => {
  //     return this._apollo
  //       .mutate({
  //         mutation: GraphQl.mutationCreateTag,
  //         variables: { newTagInput },
  //       })
  //       .subscribe(
  //         (queryResult: ApolloQueryResult<{ createTag: ITag }>) => {
  //           observer.next(queryResult.data.createTag);
  //           observer.complete();
  //         },
  //         (err) => {
  //           observer.error(err);
  //         },
  //       );
  //   });
  // }

  // public update({ id: idRest, ...rest }): Observable<ITag> {
  //   return new Observable((observer) => {
  //     return this.apiService
  //       .putHttp({ url: `${ApiUrls.urlTag}/${idRest}`, body: rest })
  //       .subscribe(
  //         (response: ITag) => {
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
  //     return this.apiService.deleteHttp({ url: `${ApiUrls.urlTag}/${type.id}` }).subscribe(
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

import { Component, OnInit } from '@angular/core';
import { IState } from '@app/core/store';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

import * as StoreFilter from '@app/core/store/filter';
import * as StoreTag from '@app/core/store/tag';
import { ITag } from '@app/shared';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar-column',
  templateUrl: './navbar-column.component.html',
})
export class NavbarColumnComponent implements OnInit {
  public tagsNotSelected$: Observable<ITag[]>;
  public tagsSelected$: Observable<ITag[]>;
  private tagSearch$: BehaviorSubject<string>;

  constructor(private store: Store<IState>) {
    this.tagSearch$ = new BehaviorSubject('');
  }

  public ngOnInit(): void {
    this.store.dispatch(new StoreTag.Load());

    this.tagsNotSelected$ = combineLatest(
      this.store.select(StoreTag.selectTagAll) as Observable<ITag[]>,
      this.store.select(StoreFilter.selectFilterIds) as Observable<string[]>,
      this.tagSearch$,
    ).pipe(
      map(([tags, filter, search]) =>
        tags.filter((tag: ITag) => !filter.includes(tag.id) && tag.title.includes(search)),
      ),
    );

    this.tagsSelected$ = combineLatest(
      this.store.select(StoreTag.selectTagAll) as Observable<ITag[]>,
      this.store.select(StoreFilter.selectFilterIds) as Observable<string[]>,
    ).pipe(map(([tags, filter]) => tags.filter((tag: ITag) => filter.includes(tag.id))));
  }

  public addTagToFilter(id: string): void {
    this.store.dispatch(new StoreFilter.Add({ id }));
  }

  public removeTagToFilter(id: string): void {
    this.store.dispatch(new StoreFilter.Remove({ id }));
  }

  public searchTag(search: string): void {
    this.tagSearch$.next(search);
  }
}

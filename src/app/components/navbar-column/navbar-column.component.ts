import { Component, OnInit } from '@angular/core';
import { IState } from '@app/core/store';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

import * as StoreFilter from '@app/core/store/filter';
import * as StoreTag from '@app/core/store/tag';
import { ITag } from '@app/shared';
import { Dictionary } from '@ngrx/entity/src/models';
import { map, take } from 'rxjs/operators';
import { tagAnimation } from './navbar-column.animation';

@Component({
  selector: 'app-navbar-column',
  templateUrl: './navbar-column.component.html',
  animations: tagAnimation,
})
export class NavbarColumnComponent implements OnInit {
  public tagsNotSelected: string[];
  public tagsNotSelected$: Observable<ITag[]>;
  public tagsSelected$: Observable<ITag[]>;
  private tagSearch$: BehaviorSubject<string>;

  constructor(private store: Store<IState>) {
    this.tagsNotSelected = [];
    this.tagSearch$ = new BehaviorSubject('');
  }

  public ngOnInit(): void {
    this.store.dispatch(new StoreTag.Load());

    this.store
      .select(StoreTag.selectTagIds)
      .pipe(take(2))
      .subscribe((tags: string[]) => {
        this.tagsNotSelected = tags.map((v: string) => v);
      });

    this.tagsNotSelected$ = combineLatest(
      this.store.select(StoreTag.selectTagAll) as Observable<ITag[]>,
      this.store.select(StoreFilter.selectFilterIds) as Observable<string[]>,
      this.tagSearch$,
    ).pipe(
      map(([tags, filter, search]) => {
        const filterNotSelected = this.filterTagByOrder(tags);

        return filterNotSelected.filter(
          (tag: ITag) => !filter.includes(tag.id) && tag.title.includes(search),
        );
      }),
    );

    this.tagsSelected$ = combineLatest(
      this.store.select(StoreFilter.selectFilterIds) as Observable<string[]>,
      this.store.select(StoreTag.selectTagEntities) as Observable<Dictionary<ITag>>,
    ).pipe(map(([filters, tags]) => filters.map((filter: string) => tags[filter])));
  }

  public addTagToFilter(id: string): void {
    const index = this.tagsNotSelected.indexOf(id);
    if (index !== -1) {
      this.tagsNotSelected.splice(index, 1);
    }

    this.store.dispatch(new StoreFilter.Add({ id }));
  }

  public removeTagToFilter(id: string): void {
    this.tagsNotSelected.push(id);

    this.store.dispatch(new StoreFilter.Remove({ id }));
  }

  public searchTag(search: string): void {
    this.tagSearch$.next(search);
  }

  public trackByFn(index: number, tag: ITag) {
    return `${tag.id}-${index}`;
  }

  private filterTagByOrder(tags: ITag[]): ITag[] {
    return tags.sort((a: ITag, b: ITag) => {
      if (this.tagsNotSelected.indexOf(a.id) > this.tagsNotSelected.indexOf(b.id)) {
        return 1;
      }
      if (this.tagsNotSelected.indexOf(a.id) < this.tagsNotSelected.indexOf(b.id)) {
        return -1;
      }
      return 0;
    });
  }
}

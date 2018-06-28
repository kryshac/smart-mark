import { Component, OnInit } from '@angular/core';
import { IState } from '@app/core/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as StoreTag from '@app/core/store/tag';
import { ITag } from '@app/shared';

@Component({
  selector: 'app-navbar-column',
  templateUrl: './navbar-column.component.html',
})
export class NavbarColumnComponent implements OnInit {
  public tags$: Observable<ITag[]>;

  constructor(private store: Store<IState>) {}

  public ngOnInit(): void {
    this.store.dispatch(new StoreTag.Load());
    this.tags$ = this.store.select(StoreTag.selectTagAll);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { take, tap } from 'rxjs/operators';

import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { IState } from '@app/core/store';
import * as StoreBookmark from '@app/core/store/bookmark';

@Component({
  selector: 'app-remove-bookmark',
  templateUrl: './remove-bookmark.component.html',
})
export class RemoveBookmarkComponent {
  @Input() public data: { id: string };
  @Output() public action = new EventEmitter<string>();

  constructor(private store: Store<IState>, private storyEffects: Actions) {}

  public removeBookmark() {
    this.action.emit('startAnimation');
    this.store.dispatch(new StoreBookmark.Remove({ id: this.data.id }));
    this.storyEffects
      .ofType(StoreBookmark.Actions.RemoveSuccess)
      .pipe(
        tap(() => this.action.emit('close')),
        take(1),
      )
      .subscribe();
  }

  public cancelAction() {
    this.action.emit('close');
  }
}

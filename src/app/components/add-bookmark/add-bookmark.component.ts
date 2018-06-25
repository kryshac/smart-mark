import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { takeWhile, tap } from 'rxjs/operators';

import { IState } from '@app/core/store';
import * as StoreBookmark from '@app/core/store/bookmark';
import { Action, ActionsSubject, Store } from '@ngrx/store';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
})
export class AddBookmarkComponent {
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddBookmarkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private store: Store<IState>,
    private actions: ActionsSubject,
  ) {
    this.form = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      url: this.fb.control('', [Validators.required]),
    });
  }

  public cancelAction(): void {
    this.dialogRef.close();
  }

  public addBookmark(): void {
    const bookmark = this.form;

    if (bookmark.valid) {
      const newBookmark = { ...bookmark.value, tags: ['tag1', 'tag2'] };
      this.store.dispatch(new StoreBookmark.Add(newBookmark));
      this.actions
        .pipe(
          tap((action: Action) => {
            if (action.type === StoreBookmark.Actions.AddSuccess) {
              this.dialogRef.close();
            }
          }),
          takeWhile((action: Action) => action.type !== StoreBookmark.Actions.AddSuccess),
        )
        .subscribe();
    }
  }
}

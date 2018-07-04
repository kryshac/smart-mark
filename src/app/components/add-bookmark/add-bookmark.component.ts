import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeWhile, tap } from 'rxjs/operators';

import { IState } from '@app/core/store';
import * as StoreBookmark from '@app/core/store/bookmark';
import { Action, ActionsSubject, Store } from '@ngrx/store';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
})
export class AddBookmarkComponent {
  @Output() public action = new EventEmitter<string>();
  public form: FormGroup;
  public tags: string[];

  constructor(
    private fb: FormBuilder,
    private store: Store<IState>,
    private actions: ActionsSubject,
  ) {
    this.form = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      url: this.fb.control('', [Validators.required]),
      tag: this.fb.control(''),
      tags: this.fb.array([]),
    });
    this.tags = [];
  }

  public addTag(event) {
    event.preventDefault();

    const input = this.form.get('tag');

    if (input.value !== '') {
      this.tags.push(input.value);
      (this.form.get('tags') as FormArray).push(
        this.fb.group({
          title: input.value,
          type: 'tag',
        }),
      );
      input.setValue('');
    }
  }

  public cancelAction(): void {
    this.action.emit('close');
  }

  public addBookmark(): void {
    const {
      valid,
      value: { tag, ...rest },
    } = this.form;

    if (valid) {
      const newBookmark = { ...rest };

      this.action.emit('startAnimation');
      this.store.dispatch(new StoreBookmark.Add(newBookmark));
      this.actions
        .pipe(
          tap((action: Action) => {
            if (action.type === StoreBookmark.Actions.AddSuccess) {
              this.action.emit('close');
            }
          }),
          takeWhile((action: Action) => action.type !== StoreBookmark.Actions.AddSuccess),
        )
        .subscribe();
    }
  }
}

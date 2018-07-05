import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeWhile, tap } from 'rxjs/operators';

import { addBookmarkAnimation } from '@app/components/add-bookmark/add-bookmark.animation';
import { IState } from '@app/core/store';
import * as StoreBookmark from '@app/core/store/bookmark';
import { Action, ActionsSubject, Store } from '@ngrx/store';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  animations: addBookmarkAnimation,
})
export class AddBookmarkComponent {
  @Output() public action = new EventEmitter<string>();
  public form: FormGroup;
  public tags: string[];
  public focus: string;
  public focusLabel: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<IState>,
    private actions: ActionsSubject,
  ) {
    this.form = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      url: this.fb.control('', [Validators.required]),
      tags: this.fb.array([]),
    });
    this.tags = [];
    this.focus = 'focusOut';
    this.focusLabel = 'focusOut';
  }

  public addTag(event, inputDom) {
    event.preventDefault();

    if (inputDom.value !== '') {
      this.tags.push(inputDom.value);
      this.addFormTags(inputDom.value);
      inputDom.value = '';
    }
  }

  public removeTag(index: number) {
    this.tags.splice(index, 1);
    (this.form.get('tags') as FormArray).removeAt(index);
    console.log(this.form);
  }

  public cancelAction(): void {
    this.action.emit('close');
  }

  public addBookmark(): void {
    const { valid, value } = this.form;

    if (valid) {
      const newBookmark = { ...value };

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

  public focusTag() {
    this.focus = 'focus';
    this.focusLabel = 'focus';
  }

  public focusoutTag(inputValue: string) {
    if (inputValue === '' && this.tags.length === 0) {
      this.focusLabel = 'focusOut';
    }
    this.focus = 'focusOut';
  }

  private addFormTags(value: string) {
    (this.form.get('tags') as FormArray).push(
      this.fb.group({
        title: value,
        type: 'tag',
      }),
    );
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddBookmarkComponent } from '@app/components/add-bookmark/add-bookmark.component';

@Component({
  selector: 'app-add-bookmark-button',
  templateUrl: './add-bookmark-button.component.html',
})
export class AddBookmarkButtonComponent {
  constructor(public dialog: MatDialog) {}

  public addBookmark(): void {
    this.dialog.open(AddBookmarkComponent, {
      width: '500px',
    });
  }
}

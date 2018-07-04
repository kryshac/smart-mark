import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-add-bookmark-button',
  templateUrl: './add-bookmark-button.component.html',
})
export class AddBookmarkButtonComponent {
  constructor(public dialog: MatDialog) {}

  public addBookmark(): void {
    this.dialog.open(DialogAlertComponent, {
      width: '500px',
      data: {
        title: 'Add bookmark',
        type: 'add',
      },
    });
  }
}

import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DialogAlertComponent } from '@app/components/dialog-alert/dialog-alert.component';
import { IBookmark } from '@app/shared';
import { cardBookmarkAnimation } from './card-bookmark.animation';

@Component({
  selector: 'app-card-bookmark',
  templateUrl: './card-bookmark.component.html',
  animations: [cardBookmarkAnimation],
})
export class CardBookmarkComponent {
  @Input() public bookmark: IBookmark;

  constructor(private dialog: MatDialog) {}

  public removeBookmark(id: string): void {
    this.dialog.open(DialogAlertComponent, {
      width: '500px',
      data: {
        title: 'delete this bookmark ?',
        type: 'remove',
        component: {
          id,
        },
      },
    });
  }
}

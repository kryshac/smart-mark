import { Component, Input, OnInit } from '@angular/core';
import { MatButton, MatDialog } from '@angular/material';

import { Store } from '@ngrx/store';

import { DialogAlertComponent } from '@app/components/dialog-alert/dialog-alert.component';
import { IState } from '@app/core/store';
import * as StoreBookmark from '@app/core/store/bookmark';
import { IBookmark } from '@app/shared';
import { cardBookmarkAnimation } from './card-bookmark.animation';

@Component({
  selector: 'app-card-bookmark',
  templateUrl: './card-bookmark.component.html',
  animations: [cardBookmarkAnimation],
})
export class CardBookmarkComponent implements OnInit {
  @Input() public bookmark: IBookmark;

  constructor(private store: Store<IState>, private dialog: MatDialog) {}

  public ngOnInit(): void {
    console.log(this.bookmark);
  }
  public removeBookmark(id: string, button: MatButton): void {
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((status: boolean | undefined) => {
      if (status) {
        button._elementRef.nativeElement.className += ' loading';
        this.store.dispatch(new StoreBookmark.Remove({ id }));
      }
    });
  }
}

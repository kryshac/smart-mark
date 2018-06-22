import { Component, Input, OnInit } from '@angular/core';
import { cardBookmarkAnimation } from './card-bookmark.animation';

@Component({
  selector: 'app-card-bookmark',
  templateUrl: './card-bookmark.component.html',
  animations: [cardBookmarkAnimation],
})
export class CardBookmarkComponent implements OnInit {
  @Input() public title: string;
  @Input() public icon: string;
  @Input() public url: string;
  // constructor() {}

  public ngOnInit() {
    // dsfg
  }
}

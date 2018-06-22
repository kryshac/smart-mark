import { Injectable } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BreakpointsService {
  public cols: Observable<number>;
  public grid;

  constructor(private _media: ObservableMedia) {
    this.grid = new Map([['xs', 1], ['sm', 2], ['md', 4], ['lg', 4], ['xl', 4]]);

    let start;
    this.grid.forEach((cols, mqAlias) => {
      if (this._media.isActive(mqAlias)) {
        start = cols;
      }
    });

    this.cols = this._media.asObservable().pipe(
      map((change) => {
        return this.grid.get(change.mqAlias);
      }),
      startWith(start),
    );
  }

  public changeBreakpoints(grid: ReadonlyArray<[string, number]>): void {
    this.grid = new Map(grid);
  }
}

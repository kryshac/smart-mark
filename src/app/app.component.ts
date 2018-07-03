import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result: BreakpointState) => result.matches));

  constructor(private breakpointObserver: BreakpointObserver) {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMzBhMzY0ZGIwZTE3NGMwMjUzZDFmMyIsImlhdCI6M\
TUzMDI2MzM0MH0.RDjaZNnOZ01PGuQnnS6Lbd56D_78bv-n-hUu0mVJ_5I',
    );
  }
}

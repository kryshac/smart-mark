import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { EffectsBookmark } from './bookmark.effects';
import { reducerBookmark } from './bookmark.reducer';
import { ServiceBookmark } from './bookmark.services';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: [ServiceBookmark],
})
export class BookmarkCoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootBookmarkModule,
    };
  }
}

@NgModule({
  imports: [
    BookmarkCoreModule,
    StoreModule.forFeature('bookmark', reducerBookmark),
    EffectsModule.forFeature([EffectsBookmark]),
  ],
})
export class RootBookmarkModule {}

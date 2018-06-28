import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { TagCoreModule } from '@app/core/store/tag/tag.module';
import { metaReducers, reducers } from './';
import { BookmarkCoreModule } from './bookmark/bookmark.module';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: [],
})
export class StoreCoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootStoreModule,
    };
  }
}

@NgModule({
  imports: [
    StoreCoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    BookmarkCoreModule.forRoot(),
    TagCoreModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      logOnly: true,
      maxAge: 25,
    }),
  ],
})
export class RootStoreModule {}

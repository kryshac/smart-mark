import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { EffectsTag } from './tag.effects';
import { reducerTag } from './tag.reducer';
import { ServiceTag } from './tag.services';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: [ServiceTag],
})
export class TagCoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootTagModule,
    };
  }
}

@NgModule({
  imports: [
    TagCoreModule,
    StoreModule.forFeature('tag', reducerTag),
    EffectsModule.forFeature([EffectsTag]),
  ],
})
export class RootTagModule {}

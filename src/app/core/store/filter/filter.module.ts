import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { reducerFilter } from './filter.reducer';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
})
export class FilterCoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootFilterModule,
    };
  }
}

@NgModule({
  imports: [FilterCoreModule, StoreModule.forFeature('filter', reducerFilter)],
})
export class RootFilterModule {}

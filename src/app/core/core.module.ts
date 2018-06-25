import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule, SharedModule } from '@app/shared/module';
import { GraphQLModule } from './module';
import { StoreCoreModule } from './store/store.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    StoreCoreModule.forRoot(),
    MaterialModule,
    GraphQLModule,
    SharedModule,
  ],
  declarations: [],
  exports: [SharedModule, MaterialModule],
  providers: [],
})
export class CoreModule {
  public static forRoot(configuredProviders: any[] = []): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: configuredProviders,
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule already loaded; Import in root module only.');
    }
  }
}

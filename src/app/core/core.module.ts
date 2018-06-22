import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { GraphQLModule } from './module';
import { MaterialModule, SharedModule } from './shared';
import { StoreCoreModule } from './store/store.module';

@NgModule({
  imports: [MaterialModule, GraphQLModule, StoreCoreModule.forRoot(), SharedModule],
  declarations: [],
  exports: [MaterialModule],
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

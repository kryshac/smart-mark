import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { GraphQLModule } from '@app/core/module';
import { MaterialModule } from '@app/core/shared';
import { StoreCoreModule } from '@app/core/store/store.module';

@NgModule({
  imports: [CommonModule, MaterialModule, GraphQLModule, StoreCoreModule.forRoot()],
  declarations: [],
  exports: [CommonModule, MaterialModule],
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

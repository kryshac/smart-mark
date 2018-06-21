import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { MaterialModule } from '@app/core/shared';

@NgModule({
  imports: [CommonModule, MaterialModule],
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

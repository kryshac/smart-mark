import { NgModule } from '@angular/core';

import { MaterialModule, SharedModule } from '@app/shared/module';
import { CardBookmarkComponent } from './components/card-bookmark/card-bookmark.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';

@NgModule({
  imports: [HomeRoutingModule, MaterialModule, SharedModule],
  declarations: [HomeComponent, CardBookmarkComponent],
})
export class HomeModule {}

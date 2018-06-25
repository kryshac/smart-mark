import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [],
  exports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressBarModule,
  ],
  declarations: [],
})
export class MaterialModule {}

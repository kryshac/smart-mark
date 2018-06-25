import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule],
  declarations: [],
})
export class SharedModule {}

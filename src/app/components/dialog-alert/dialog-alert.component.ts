import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
})
export class DialogAlertComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  public acceptAction() {
    this.dialogRef.close({ status: true });
  }

  public cancelAction(): void {
    this.dialogRef.close({ status: false });
  }
}

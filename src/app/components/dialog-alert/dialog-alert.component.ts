import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { dialogAlertAnimation } from './dialog-alert.animation';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  animations: dialogAlertAnimation,
})
export class DialogAlertComponent {
  public title: string;
  public type: string;
  public dataComponent: any;
  public state: string;
  public animation: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogAlertComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.title = this.data.title;
    this.type = this.data.type;
    this.dataComponent = this.data.component || '';
    this.state = 'invactive';
    this.animation = false;
  }

  public acceptAction() {
    this.dialogRef.close(true);
  }

  public cancelAction(): void {
    this.dialogRef.close(false);
  }

  public loadingStart(): any {
    this.animation = true;
    this.state = 'active';
  }

  public loopAnimation() {
    if (this.animation) {
      this.state = this.state === 'active' ? 'invactive' : 'active';
    }
  }

  public componentAction(action: string) {
    switch (action) {
      case 'close':
        this.dialogRef.close(false);
        break;
      case 'startAnimation':
        this.loadingStart();
        break;
    }
  }
}

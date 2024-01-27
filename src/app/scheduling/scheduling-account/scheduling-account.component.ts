import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/model/api-model/notification.model';

@Component({
  selector: 'app-scheduling-account',
  templateUrl: './scheduling-account.component.html',
  styleUrls: ['./scheduling-account.component.scss']
})
export class SchedulingAccountComponent {


  accountForm: FormGroup;
  accountNumber: number;
  notification: Notification;

  constructor(
    public dialogRef: MatDialogRef<SchedulingAccountComponent>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {

    this.accountForm = this.formBuilder.group({
      accountNumber: ['']
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {

  }

  onReset(){

  }

}

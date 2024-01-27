import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/model/api-model/notification.model';
import { NotificationComponent } from '../shared/notifications/notification.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-scheduling-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.scss']
})
export class LoginAccountComponent {

  accountNumber: number;
  password: string;
  router: Router;
  accountForm: FormGroup;
  notification: Notification;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    router: Router
  ) {

    this.accountForm = this.formBuilder.group({
      accountNumber: [''],
      password: ['']
    })

    this.router = router;
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if(this.validateLogin()){
      this.router.navigate(['/dashboard']);
    } else {
      this.notification = {
        title: null,
        content: "Usuário e/ou senha inválidos",
        type: "info"
      };
      this.dialog.open(NotificationComponent, {
        data: this.notification
      })
    }
  }

  onReset() {
    this.accountNumber = null;
    this.password = "";
  }

  validateLogin() {
    if (this.accountForm.value.accountNumber == 1000 && this.accountForm.value.password == "123") {
      return true;
    } else {
      return false;
    }
  }

}

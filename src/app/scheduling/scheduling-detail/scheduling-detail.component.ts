import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SchedulingService } from 'src/app/service/scheduling.service';
import { NotificationComponent } from 'src/app/shared/notifications/notification.component';
import { Notification } from 'src/model/api-model/notification.model';
import { Scheduling } from 'src/model/scheduling/scheduling.model';

@Component({
  selector: 'app-scheduling-detail',
  templateUrl: './scheduling-detail.component.html',
  styleUrls: ['./scheduling-detail.component.scss']
})
export class SchedulingDetailComponent {

  schedulingForm: FormGroup;
  isNew = false;

  scheduling: Scheduling;
  title: string = "Detalhes do Agendamento"
  uuid: string;
  originAccount: number;
  destinationAccount: number;
  transferAmount: number;
  transferRate: string;
  transferDate: string;
  schedulingDate: string;
  status: string;
  notification: Notification;

  messageOnClose: string = "Fechar";

  minDate: Date;

  constructor(
    public dialogRef: MatDialogRef<SchedulingDetailComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Scheduling,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private schedulingService: SchedulingService,
  ) {
    this.scheduling = { ...data };

    this.schedulingForm = this.formBuilder.group({
      uuid: [''],
      originAccount: [''],
      destinationAccount: [''],
      transferAmount: [''],
      transferRate: [''],
      transferDate: [''],
      schedulingDate: [''],
      status: [''],
    })

    this.minDate = new Date();
  }

  ngOnInit(): void {
    if (this.scheduling.uuid != null) {
      this.patchScheduling(this.scheduling);
    } else {
      this.isNew = true;
    }
  }

  onSubmit() {
    this.schedulingService.save(this.createScheduling(this.schedulingForm.value)).subscribe(
      (response: any) => {
        this.patchScheduling(response.data);
      });
  }

  onCancel() {
    if (this.isNew && this.validEmptyForm()) {
      this.notification = {
        title: "Cancelar",
        content: "Deseja realmente descartar as alterações no formulário?",
        type: "warning"
      };
      this.dialog.open(NotificationComponent, {
        data: this.notification
      }).afterClosed().subscribe(result => {
        if (result) {
          this.dialogRef.close();
        }
      })
    } else {
      this.dialogRef.close();
    }
  }

  patchScheduling(scheduling: Scheduling) {
    this.transferDate = new Date(scheduling.transferDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    this.schedulingDate = new Date(scheduling.schedulingDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    this.schedulingForm.patchValue(this.scheduling);
  }

  createScheduling(schedulingForm: FormGroup) {
    this.scheduling.uuid = this.schedulingForm.value.uuid;
    this.scheduling.originAccount = this.schedulingForm.value.originAccount;
    this.scheduling.destinationAccount = this.schedulingForm.value.destinationAccount;
    this.scheduling.transferAmount = this.schedulingForm.value.transferAmount;
    this.scheduling.transferRate = this.schedulingForm.value.transferRate;
    this.scheduling.transferDate = this.schedulingForm.value.transferDate;
    this.scheduling.schedulingDate = this.schedulingForm.value.schedulingDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    this.scheduling.status = this.schedulingForm.value.status;

    return this.scheduling;
  }

  validEmptyForm() {

    if (
      this.schedulingForm.value.destinationAccount == ''
      && this.schedulingForm.value.transferAmount == ''
      && this.schedulingForm.value.schedulingDate == ''
    ) {
      return false;
    } else {
      return true;
    }
  }

}


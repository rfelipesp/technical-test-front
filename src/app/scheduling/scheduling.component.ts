import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationComponent } from 'src/app/shared/notifications/notification.component';
import { Scheduling } from 'src/model/scheduling/scheduling.model';
import { SchedulingService } from '../service/scheduling.service';
import { SchedulingDetailComponent } from './scheduling-detail/scheduling-detail.component';
import { Notification } from 'src/model/api-model/notification.model';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent {

  searchForm: FormGroup;
  notification: Notification;

  public displayedColumns = ['destinationAccount', 'transferAmount', 'transferDate', 'schedulingDate', 'status', 'details', 'delete'];
  dataSource: MatTableDataSource<Scheduling>;
  Schedulings: Scheduling[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private schedulingService: SchedulingService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.schedulingService.getAll().subscribe({

      next: (response: any) => {
        this.dataSource = response.data;
      },

      error: (e) => {
        console.error(e);
      },

    });
  }

  onDetails(element: any) {
    this.schedulingService.getOne(element).subscribe({

      next: (response: any) => {
        this.dialog.open(SchedulingDetailComponent, {
          width: '100%',
          data: response.data[0]
        })
      },

      error: (e) => {
        console.log(e);
      },

    });
  }

  onDeleteScheduling(id: number) {
    this.notification = {
      title: "Cancelar Agendamento",
      content: "Deseja realmente cancelar o agendamento?",
      type: "warning"
    };
    this.dialog.open(NotificationComponent, {
      data: this.notification
    }).afterClosed().subscribe({

      next: (result) => {
        if (result) {
          this.schedulingService.delete(id).subscribe({

            next: () => {
              this.notification = {
                title: "Cancelamento Realizado",
                content: "Agendamento cancelado com sucesso!",
                type: "info"
              };

              this.dialog.open(NotificationComponent, {
                data: this.notification
              })

              this.getAll();
            },

            error: (e) => {
              console.log(e);
            },
          });
        }
      },

      error: (e) => {
        console.log(e);
      },
    })
  }

}

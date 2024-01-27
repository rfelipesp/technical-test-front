import { Component, Input, ViewChild } from '@angular/core';
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
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent {

  @Input() accountNumber: number;
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
    this.schedulingService.getAll().pipe(
      catchError(error => {
        console.log(error);
        return of([])
      })
    ).subscribe({

      next: (response: any) => {
        this.dataSource = response.data;
      }
    });
  }

  onAddNewScheduling() {

    this.dialog.open(SchedulingDetailComponent, {
      width: '40%',

    }).afterClosed().subscribe({

      next: (response: Scheduling) => {
        if (this.validateForm(response)) {
          this.schedulingService.save(response).pipe(
            catchError(error => {
              console.log(error);
              this.buildNotification("Erro", "Não foi possível atender a soicitação", "info");
              return of()
            })
          ).subscribe(
            (response: any) => {
              if (response.message != 'Success') {
                this.buildNotification("Erro", "Periodo selecionado inválido", "info");
              }
              this.getAll();
            });
        }
      },
    })
  }

  onDetails(element: any) {
    this.schedulingService.getOne(element).pipe(
      catchError(error => {
        console.log(error);
        this.buildNotification("Erro", "Não foi possível atender a soicitação", "info");
        return of()
      })
    ).subscribe({

      next: (response: any) => {
        this.dialog.open(SchedulingDetailComponent, {
          width: '40%',
          data: response.data[0]
        })
      },
    });
  }

  onDeleteScheduling(id: number) {
    this.buildNotification("Cancelar Agendamento", "Deseja realmente cancelar o agendamento?", "warning")
      .afterClosed().subscribe({

        next: (result) => {
          if (result) {
            this.schedulingService.delete(id).pipe(
              catchError(error => {
                console.log(error);
                this.buildNotification("Erro", "Não foi possível atender a soicitação", "info");
                return of()
              })
            ).subscribe({

              next: () => {
                this.buildNotification("Cancelamento Realizado", "Agendamento cancelado com sucesso!", "info");
                this.getAll();
              },
            });
          }
        },
      })
  }

  buildNotification(title: string, content: string, type: string) {
    this.notification = {
      title: title,
      content: content,
      type: type
    };

    return this.dialog.open(NotificationComponent, {
      data: this.notification
    })
  }

  validateForm(scheduling: Scheduling) {
    if (
      scheduling.originAccount != null
      && scheduling.transferAmount != null
      && scheduling.transferDate != null
      && scheduling.originAccount != null) {
      return true;
    } else {
      return false;
    }
  }
}

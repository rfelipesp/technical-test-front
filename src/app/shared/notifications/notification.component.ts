import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/model/api-model/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  title: string;
  content: string;
  type: string

  isClear: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<NotificationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Notification,
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.content = this.data.content;
    this.type = this.data.type;
  }

  onSubmit(){
    this.dialogRef.close(this.isClear)
  }

}

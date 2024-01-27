import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/model/api-model/api-response.model';
import { Scheduling } from 'src/model/scheduling/scheduling.model';


@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  private readonly API = `${environment.urlApi}/tokio/scheduler`;

  constructor(private httpClient: HttpClient) {

  }

  public getAll() {
    return this.httpClient.get<ApiResponse[]>(`${this.API}`)
      .pipe(
        first(),
        tap(scheduling => console.log(scheduling))
      );
  }

  public getOne(uuid: string) {
    return this.httpClient.get<ApiResponse[]>(`${this.API}/${uuid}`)
      .pipe(
        first(),
        tap(scheduling => console.log(scheduling))
      );
  }

  public delete(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`)
      .pipe(
        first(),
        tap(scheduling => console.log(scheduling))
      );
  }

  public save(Scheduling: Scheduling) {
    return this.httpClient.post(`${this.API}`, Scheduling)
      .pipe(
        first(),
        tap(scheduling => console.log(scheduling))
      );
  }

}

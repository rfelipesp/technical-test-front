import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulingComponent } from './scheduling/scheduling.component';

export const routes: Routes = [
  { path: '', redirectTo: 'scheduling', pathMatch: 'full' },
  {
    path: "scheduling",
    component: SchedulingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

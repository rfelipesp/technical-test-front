import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginAccountComponent } from './login-account/login-account.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: "login",
    component: LoginAccountComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
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

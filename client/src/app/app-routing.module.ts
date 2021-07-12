// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { NotFoundPageComponent } from './core/containers/not-found-page.component';
// import { AuthGuard } from './auth/services/auth-guard.service';

// export const routes: Routes = [
//   { path: '', redirectTo: '/books', pathMatch: 'full' },
//   {
//     path: 'books',
//     loadChildren: './books/books.module#BooksModule',
//     canActivate: [AuthGuard],
//   },
//   { path: '**', component: NotFoundPageComponent },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes, { useHash: true })],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'dashboard',
    canActivate : [AuthGuard],
    component : EmployeeComponent
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

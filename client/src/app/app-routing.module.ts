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


const routes: Routes = [
  {
    path : 'login',
    component : EmployeeComponent
  },
  {
    path : '',
    component : EmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

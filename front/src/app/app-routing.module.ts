 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { AuthGuard } from './guards/auth.guard';
import { LendingsComponent } from './lendings/lendings.component';
import { LoginComponent } from './login/login.component';
import { NewLendingComponent } from './new-lending/new-lending.component';
import { RegisterComponent } from './register/register.component';
import { ReturnsComponent } from './returns/returns.component';

const routes: Routes = [
  {path: 'prestamos', component: LendingsComponent, canActivate: [AuthGuard]},
  {path: 'nuevo-prestamo', component: NewLendingComponent, canActivate: [AuthGuard]},
  {path: 'devoluciones', component: ReturnsComponent, canActivate: [AuthGuard]},
  {path: 'libros', component: BooksComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: '**', redirectTo: 'prestamos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

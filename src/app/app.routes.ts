import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecuperarpwComponent } from './pages/recuperarpw/recuperarpw.component';
import { PoliticasComponent } from './pages/politicas/politicas.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'recuperarpw', component: RecuperarpwComponent},
    { path: 'politicas', component: PoliticasComponent},
    { path: '**', component: NotFoundComponent }
];

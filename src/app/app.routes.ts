import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecuperarpwComponent } from './pages/recuperarpw/recuperarpw.component';
import { PoliticasComponent } from './pages/politicas/politicas.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'recuperarpw', component: RecuperarpwComponent},
    { path: 'politicas', component: PoliticasComponent},
    { 
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            { path: 'presentation', loadComponent: () => import('./pages/dashboard/presentation/presentation.component').then(m => m.PresentationComponent) },
            { path: 'experience', loadComponent: () => import('./pages/dashboard/experience/experience.component').then(m => m.ExperienceComponent) },
            { path: 'education', loadComponent: () => import('./pages/dashboard/education/education.component').then(m => m.EducationComponent) },
            { path: 'projects', loadComponent: () => import('./pages/dashboard/projects/projects.component').then(m => m.ProjectsComponent) }
        ]
    },
    { path: '**', component: NotFoundComponent }
];

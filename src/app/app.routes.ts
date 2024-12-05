import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { GamesCatalogComponent } from './games/games-catalog/games-catalog.component';
import { CreateGameComponent } from './games/create-game/create-game.component';
import { Error404Component } from './errors/error404/error404.component';
import { NgModule } from '@angular/core';
import { EditGameComponent } from './games/edit-game/edit-game.component';
import { AboutComponent } from './core/about/about.component';
import { ContactComponent } from './core/contact/contact.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { GalleryComponent } from './games/gallery/gallery.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Board Game Hub',
        data: { animation: 'home' }
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register', canActivate: [GuestGuard],
        data: { animation: 'register' }
    },
    {
        path: 'login', component: LoginComponent,
        title: 'Login', canActivate: [GuestGuard],
        data: { animation: 'login' }
    },
    {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile',
        canActivate: [AuthGuard],
        data: { animation: 'profile' }
    },
    {
        path: 'catalog',
        component: GamesCatalogComponent,
        title: 'Catalog',
        data: { animation: 'catalog' }
    },
    {
        path: 'create',
        component: CreateGameComponent,
        title: 'Create',
        canActivate: [AuthGuard],
        data: { animation: 'create' }
    },
    {
        path: 'edit/:id',
        component: EditGameComponent,
        title: 'Edit',
        canActivate: [AuthGuard],
        data: { animation: 'edit' }
    },
    {
        path: 'details/:id',
        loadComponent: () => import('./games/details/details.component').then(m => m.DetailsComponent),
        title: 'Details',
        data: { animation: 'details' }
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'About',
        data: { animation: 'about' }
    },
    {
        path: 'contact',
        component: ContactComponent,
        title: 'Contact',
        data: { animation: 'contact' }
    },
    {
        path: 'gallery',
        component: GalleryComponent,
        title: 'Gallery',
        data: { animation: 'gallery' }
    },
    {
        path: '**',
        component: Error404Component,
        title: 'Error 404',
        data: { animation: 'error404' }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

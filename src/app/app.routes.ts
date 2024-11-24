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
import { DetailsComponent } from './games/details/details.component';
import { AboutComponent } from './core/about/about.component';
import { ContactComponent } from './core/contact/contact.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { GalleryComponent } from './games/gallery/gallery.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: 'Home' },
    { path: 'register', component: RegisterComponent, title: 'Register', canActivate: [GuestGuard] },
    { path: 'login', component: LoginComponent, title: 'Login', canActivate: [GuestGuard] },
    { path: 'profile', component: ProfileComponent, title: 'Profile', canActivate: [AuthGuard] },
    { path: 'catalog', component: GamesCatalogComponent, title: 'Catalog' },
    { path: 'create', component: CreateGameComponent, title: 'Create', canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditGameComponent, title: 'Edit', canActivate: [AuthGuard] },
    { path: 'details/:id', component: DetailsComponent, title: 'Details' },
    { path: 'about', component: AboutComponent, title: 'About' },
    { path: 'contact', component: ContactComponent, title: 'Contact' },
    { path: 'gallery', component: GalleryComponent, title: 'Gallery' },
    { path: '**', component: Error404Component, title: 'Error 404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

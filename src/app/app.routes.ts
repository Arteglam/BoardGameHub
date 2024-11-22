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
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'catalog', component: GamesCatalogComponent },
    { path: 'create', component: CreateGameComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditGameComponent, canActivate: [AuthGuard] },
    { path: 'details/:id', component: DetailsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: '**', component: Error404Component }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

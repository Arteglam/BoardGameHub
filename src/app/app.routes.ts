import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { GamesCatalogComponent } from './games/games-catalog/games-catalog.component';
import { CreateGameComponent } from './games/create-game/create-game.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'catalog', component: GamesCatalogComponent },
    { path: 'create', component: CreateGameComponent },
    { path: '**', redirectTo: '/home' }
];

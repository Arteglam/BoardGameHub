import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/header/header.component";
import { FooterComponent } from "./core/footer/footer.component";
import { MaterialLibraryModule } from './material-library/material-library.module';
import { routeTransition } from './animations/route-transition';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MaterialLibraryModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeTransition]
})
export class AppComponent {
  title = 'BoardGameHub';
  constructor(protected route: ActivatedRoute) {}
}

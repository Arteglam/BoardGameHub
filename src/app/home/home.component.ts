import { Component } from '@angular/core';
import { MaterialLibraryModule } from '../material-library/material-library.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialLibraryModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

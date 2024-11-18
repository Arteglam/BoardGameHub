import { Component } from '@angular/core';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [MaterialLibraryModule, RouterLink],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.scss'
})
export class Error404Component {

}

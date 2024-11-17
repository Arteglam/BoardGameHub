import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialLibraryModule } from '../../material-library/material-library.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MaterialLibraryModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}

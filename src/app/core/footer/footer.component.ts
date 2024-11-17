import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialLibraryModule } from '../../material-library/material-library.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, MaterialLibraryModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}

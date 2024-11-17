import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MaterialLibraryModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


}

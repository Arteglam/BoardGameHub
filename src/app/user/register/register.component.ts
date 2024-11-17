import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MaterialLibraryModule } from '../../material-library/material-library.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, MaterialLibraryModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}

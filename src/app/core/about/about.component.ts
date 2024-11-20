import { Component } from '@angular/core';
import { MaterialLibraryModule } from '../../material-library/material-library.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MaterialLibraryModule, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}

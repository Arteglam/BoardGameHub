import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-games-catalog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './games-catalog.component.html',
  styleUrl: './games-catalog.component.scss'
})
export class GamesCatalogComponent {

}

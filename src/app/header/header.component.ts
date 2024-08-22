import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule], // Add RouterModule here
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Corrected the property name
})
export class HeaderComponent {}

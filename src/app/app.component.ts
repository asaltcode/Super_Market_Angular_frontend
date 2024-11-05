import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrdercomponentComponent } from './ordercomponent/ordercomponent.component';
import { ProductcomponentComponent } from './productcomponent/productcomponent.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, OrdercomponentComponent, FormsModule, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}

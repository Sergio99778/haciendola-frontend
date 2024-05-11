import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  constructor(private router: Router) {}

  logoff() {
    this.router.navigateByUrl('/login');
    // remove token from local storage
    localStorage.removeItem(environment.auth_token_local_storage_key);
  }
}

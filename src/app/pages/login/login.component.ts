import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginObj: Login;

  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
  }

  ngOnInit(): void {
    const localToken = localStorage.getItem(
      environment.auth_token_local_storage_key
    );
    if (localToken) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  onLogin() {
    this.http
      .post(`${environment.api_base_url}/auth/login`, {
        email: this.loginObj.EmailId,
        password: this.loginObj.Password,
      })
      .subscribe({
        next: (res: any) => {
          if (res.access_token) {
            localStorage.setItem(
              environment.auth_token_local_storage_key,
              res.access_token
            );
            this.router.navigateByUrl('/dashboard');
          } else {
            alert(res.error.message);
          }
        },
        error: (error) => {
          alert('Error: ' + error.error.message);
        },
      });
  }
}

export class Login {
  EmailId: string;
  Password: string;
  constructor() {
    this.EmailId = '';
    this.Password = '';
  }
}

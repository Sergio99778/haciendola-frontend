import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.http
      .get(`${environment.api_base_url}/products`)
      .subscribe((res: any) => {
        if (res.length) {
          console.log('Response from Products: ', res);
        } else {
          alert(res.message);
        }
      });
  }
}

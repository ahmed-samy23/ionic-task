import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dataCash: any = {}
  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get('https://healthyandtasty.net/healthyProject/public/api/v1/get_category/138?token=ay5t9Xh4hmAXSUEBby9j9dSAxjNCtnrFKp6x9YqG43JaXbpHESvHsP9G4vCg&lang=en&limit=10&skip=10&branch_id=3')
  }
}

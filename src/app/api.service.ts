import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //All Product CRUD opration
  constructor(private http : HttpClient) { }
  getProducts ():Observable<any> {
    return this.http.get(environment.apiUrl + '/product')
  }

  addProduct (data:any) {
    return this.http.post(environment.apiUrl + "/product", data)
  }

  getProductById (ProductId:String){
    return this.http.get(environment.apiUrl + `/product/${ProductId}`)
  }

  editProduct (productId: String, data:any) {
    return this.http.put(environment.apiUrl + `/product/${productId}`, data)
  }
  deleteProduct (productId: String) {
    return this.http.delete(environment.apiUrl + `/product/${productId}`)
  }

  //All Order CRUD operation
  createOrder () {
    return this.http.post(environment.apiUrl + "/orders", "")
  }
  getOrders ():Observable<any> {
    return this.http.get(environment.apiUrl + "/orders");
  }
  
  getOrderById (orderId: string) {
    return this.http.get(environment.apiUrl + `/orders/${orderId}`);
  }
  deleteOrder (orderId:string) {
    return this.http.delete(environment.apiUrl + `/orders/${orderId}`);
  }

  updateOrder(orderId: string, data:any) {
    return this.http.put(environment.apiUrl + `/orders/${orderId}`, data);
  }
}

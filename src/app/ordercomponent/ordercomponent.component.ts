import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-ordercomponent',
  standalone: true,
  imports: [FormsModule, CommonModule, MatAutocompleteModule, MatFormFieldModule, MatLabel, ReactiveFormsModule],
  templateUrl: './ordercomponent.component.html',
  styleUrl: './ordercomponent.component.css'
})
export class OrdercomponentComponent implements OnInit{
  orders:any[] = []

 

formatDateString(isoString:any) { //This is order date formater
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}


constructor(private router: Router, private apiService: ApiService ){
}

createOrder () {
   this.apiService.createOrder().subscribe((data:any) =>{
    let newArray = [...this.orders, data.order]
    this.orders = [...newArray]
    this.router.navigate([`/order`, data.order._id])
   })
}

getOrders () {
  this.apiService.getOrders().subscribe((data) => {
    this.orders = data.orders
  })
}

ngOnInit(): void {
  this.getOrders()
 
}


//This is delete single order

handleDeleteOrder(orderId:string) {
    if(confirm("Are you sure delete this order")){
      let newArray = [...this.orders]
      newArray = newArray.filter((val:any) => val._id !== orderId)
      this.orders = newArray
      this.apiService.deleteOrder(orderId).subscribe()
    }  
}

handleEditOrder(orderId:string) {
    this.router.navigate(['/order', orderId])
}

  handleClick () {
    this.createOrder()
  }
  handleClickProduct () {
    this.router.navigate(['/items'])
  }
 }

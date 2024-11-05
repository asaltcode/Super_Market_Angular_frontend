import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService){}
   allProducts:any[] = []
   defaultImg:String = "https://cdni.iconscout.com/illustration/premium/thumb/product-is-empty-8044872-6430781.png"
   ngOnInit(): void {
     this.apiService.getProducts().subscribe((data)=>{
      this.allProducts = data.product
     })
   }
   navAddItem() {
    this.router.navigate(["/add-items"])
   }
   navOrder() {
    this.router.navigate([""])
   }

   handleEdit(id:String){
     this.router.navigate(["/edit-product", id])
   }
   handleDelete(id:String){
    let newArray = [...this.allProducts]
    newArray = newArray.filter((data) => data._id !== id)
    if(confirm("Are you sure delete this product")){
      this.allProducts = newArray
      this.apiService.deleteProduct(id).subscribe((data)=>{})
    }
   }
}

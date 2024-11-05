import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  constructor(private router: Router, private apiService: ApiService){}
   defaultImg:String = "https://cdni.iconscout.com/illustration/premium/thumb/product-is-empty-8044872-6430781.png"
   newProduct:any = {name:"", price: 0}
   selectedFile:any;
   setAvatarPreview:String = ""


   onFileSelected(event: Event):void {
    const input = event.target as HTMLInputElement;
    if(input.files?.length){
      this.selectedFile = input.files[0]
      const reader = new FileReader
           reader.onload = () =>{
            if(reader.readyState === 2){
              this.setAvatarPreview = `${reader.result}`
            }
           }
           reader.readAsDataURL(input.files[0])
    }
   }

   creatProduct () {
      const formData = new FormData()
      formData.append('image', this.selectedFile);
      formData.append('name', this.newProduct.name)
      formData.append('price', this.newProduct.price)
      this.apiService.addProduct(formData).subscribe((data)=>{
        this.navOrder()
      })
   }
   navOrder(){
    this.router.navigate(["items"])
   }
}

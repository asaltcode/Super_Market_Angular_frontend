import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute){}

  id:string = "";
  currentProduct:any = {};
  selectedFile:any;
  setAvatarPreview:String = ""
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.id = `${params.get("id")}`
    })

    this.apiService.getProductById(this.id).subscribe((data:any)=>{
      this.currentProduct = data.product;
    })
  }
   
   navOrder(){
    this.router.navigate(["items"])
   }
   
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

   handleSave(){
   let formData = new FormData();
   formData.append('image', this.selectedFile);
   formData.append('name', this.currentProduct.name);
   formData.append('price', this.currentProduct.price);
    this.apiService.editProduct(this.id, formData).subscribe((data)=>{
     this.router.navigate(["items"]);
    })
  }
}

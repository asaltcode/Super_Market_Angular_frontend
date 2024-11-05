import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@Component({
  selector: 'app-productcomponent',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatLabel,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    AsyncPipe,
    AutocompleteLibModule
  ],
  templateUrl: './productcomponent.component.html',
  styleUrls: ['./productcomponent.component.css'],
})
export class ProductcomponentComponent implements OnInit {
  selectedValue = '0';
  quantityValue: number = 1;
  quantityTotal: number = 0;
  Total: number = 0;
  id: any;
  products:any = [];
  currentOrder: any = { items: [] };
  selectedProduct:any
  itemControls: FormControl[] = [];
  filteredOptions: Observable<any[]>[] = [];
  keyword = 'name';
  states = [
    {
      name: 'Arkansas',
      population: '2.978M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.apiService.getOrderById(this.id).subscribe((data: any) => {
        this.currentOrder = data.order;
        this.initializeFormControls();
        this.calculateTotal();
      });
      this.apiService.getProducts().subscribe((data) => {
        this.products = data.product;
        this.initializeFormControls();
      });
    });
  }

  
formatDateString(isoString:any) { //This is order date formater
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

  initializeFormControls(): void {
    this.itemControls = this.currentOrder.items.map((item:any, index:any) => {
      const control = new FormControl(item.itemName);
      this.filteredOptions[index] = control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '', index))
      );
      control.valueChanges.subscribe(value => {
        const selectedProduct = this.products.find((product:any) => product.name === value);
        if (selectedProduct) {
          this.currentOrder.items[index].unitPrice = selectedProduct.price;
          this.currentOrder.items[index].itemName = selectedProduct.name;
          this.calculateTotal();
        }
      });
      return control;
    });
  }

  private _filter(value: string, index: number): any[] {
    const filterValue = value.toLowerCase();
    return this.products.filter((option:any) => option.name.toLowerCase().includes(filterValue));
  }

  handlePrice(event: Event, item: any, i: any): void {
    const inputElement = event.target as HTMLInputElement;
    this.currentOrder.items[i].unitPrice = parseFloat(inputElement.value);
    this.calculateTotal();
  }

  handleQuantityChange(event: Event, item: any): void {
    const inputElement = event.target as HTMLInputElement;
    let value = +inputElement.value;
    if (isNaN(value) || value < 1) {
      value = 1;
      inputElement.value = '1';
    }
    item.quantity = value;
    this.calculateTotal();
  }
  calculateTotal(): void {
    this.currentOrder.orderAmount = this.currentOrder.items.reduce(
      (total: number, item: any) => total + item.unitPrice * item.quantity,
      0
    );
  }

  handleProductSearch(newItem:any) {
    // Check if the item already exists in the currentOrder
    let existingItem = this.currentOrder.items.find((data:any) => data.itemName === newItem.name);

    if (existingItem) {
        // If the item exists, increase its quantity
        existingItem.quantity++;
    } else {
        // If the item doesn't exist, add it to currentOrder
        let item = {
            itemName: newItem.name,
            unitPrice: newItem.price,
            quantity: 1,
            amount: 0,  // You might want to calculate this based on quantity * unitPrice
        };
        this.currentOrder.items.push(item);
    }

    // Calculate total after updating items
    this.calculateTotal();
}

  

  handleAddItem(): void {
    let item = {
      itemName: '',
      unitPrice: 0,
      quantity: 1,
      amount: 0,
    };
    this.currentOrder.items = [...this.currentOrder.items, item];
    this.initializeFormControls();
  }

  removeItem(i: number): void {
    let newArray = [...this.currentOrder.items];
    newArray.splice(i, 1);
    this.currentOrder.items = [...newArray];
    this.currentOrder.orderAmount = newArray.reduce(
      (total: number, item: any) => total + item.unitPrice * item.quantity,
      0
    );
    this.initializeFormControls();
  }

  handleSave(orderId: string): void {
    let data = {
      orderAmount: this.currentOrder.orderAmount,
      customerName: this.currentOrder.customerName,
      items: this.currentOrder.items,
    };
    this.apiService.updateOrder(orderId, data).subscribe((data) => {
      console.log(data);
      this.router.navigate(['']);
    });
  }

  navOrder(): void {
    this.router.navigate(['']);
  }
}


// import {Component} from '@angular/core';
// import {FormControl, ReactiveFormsModule} from '@angular/forms';

// import {Observable} from 'rxjs/Observable';
// import {startWith} from 'rxjs/operators/startWith';
// import {map} from 'rxjs/operators/map';

// import { map, Observable, startWith } from 'rxjs';
// import { MatSlideToggle } from '@angular/material/slide-toggle';
// import { MatIcon, MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';h


// export class State {
//   constructor(public name: string, public population: string, public flag: string) { }
// }

// /**
//  * @title Autocomplete overview
//  */
// @Component({
//   selector: 'app-productcomponent',
//   imports: [
//         CommonModule,      
//         MatFormFieldModule,
//         MatLabel,
//         MatSlideToggle,
//         MatAutocompleteModule,
//         MatInputModule,
//         AsyncPipe,
//         ReactiveFormsModule,
//         MatButtonModule,
//         MatIconModule,
//       ],
//       standalone: true,

//   templateUrl: './productcomponent.component.html',
//   styleUrls: ['./productcomponent.component.css'],
// })
// export class ProductcomponentComponent {
//   stateCtrl: FormControl;
//   filteredStates: Observable<any[]>;

//   states: State[] = [
//     {
//       name: 'Arkansas',
//       population: '2.978M',
//       // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
//       flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
//     },
//     {
//       name: 'California',
//       population: '39.14M',
//       // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
//       flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
//     },
//     {
//       name: 'Florida',
//       population: '20.27M',
//       // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
//       flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
//     },
//     {
//       name: 'Texas',
//       population: '27.47M',
//       // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
//       flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
//     }
//   ];

//   constructor() {
//     this.stateCtrl = new FormControl();
//     this.filteredStates = this.stateCtrl.valueChanges
//       .pipe(
//         startWith(''),
//         map(state => state ? this.filterStates(state) : this.states.slice())
//       );
//   }

//   filterStates(name: string) {
//     return this.states.filter(state =>
//       state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
//   }

//   onEnter(evt: any){
//     if (evt.source.selected) {
//     alert("hello ");
//     }
//   }
// }


/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
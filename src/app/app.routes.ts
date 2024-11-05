import { Routes } from '@angular/router';
import { OrdercomponentComponent } from './ordercomponent/ordercomponent.component';
import { ProductcomponentComponent } from './productcomponent/productcomponent.component';
import { ItemsComponent } from './items/items.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { TestComponent } from './test/test.component';


export const routes: Routes = [
    {
        path: "",
        title: "Orders",
        component: OrdercomponentComponent
    },
    {
        path: "order/:id",
        title: "Products",
        component: ProductcomponentComponent
    },
    {
        path: "items",
        title: "Items",
        component: ItemsComponent
    },
    {
        path: "add-items",
        title: "Add Items",
        component: AddProductComponent
    },
    {
        path: "edit-product/:id",
        title: "Edit Product",
        component: EditProductComponent
    },
    {
        path: "test",
        component: TestComponent
    }
];

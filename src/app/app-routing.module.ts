import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CartItemComponent } from './home/cart-item/cart-item.component';
import { AdminComponent } from './Admin/admin.component';
import { AddProductComponent } from './Admin/add-product/add-product.component';
import { AddressComponent } from './home/address/address.component';
import { OrderComponent } from './Admin/order/order.component';


const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'home/viewCart',component:CartItemComponent},
  {path:'home/address',component:AddressComponent},
  {path:'admin/home',component:AdminComponent},
  {path:'admin',component:AdminComponent},
  {path:'admin/add-product',component:AddProductComponent},
  {path:'admin/order',component:OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem, MessageService} from 'primeng/api';                 //api

import {ToastModule} from 'primeng/toast';
import { NotifyService } from './common/notify.service';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';





import { ProductComponent } from './home/product/product.component';
import { CartItemComponent } from './home/cart-item/cart-item.component';
import { AddressComponent } from './home/address/address.component';
import { AddProductComponent } from './Admin/add-product/add-product.component';
import { AdminComponent } from './Admin/admin.component';
import { OrderComponent } from './Admin/order/order.component';
import { SafePipe } from './common/SafePipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    ProductComponent,
    CartItemComponent,
    AddressComponent,
    AddProductComponent,
    AdminComponent,
    OrderComponent,
    SafePipe
   
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccordionModule,
    ToastModule,
    ConfirmDialogModule,
  
    
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    NotifyService,MessageService,ConfirmationService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

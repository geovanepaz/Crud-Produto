import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ToastrModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NavegacaoModule,
    HttpClientModule,
    CoreModule,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from '@app/core/template';
import { HttpClientModule } from '@angular/common/http';
import { Config } from '@app/core/services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TemplateModule,
  ],
  providers: [
    Config,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

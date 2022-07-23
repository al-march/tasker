import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from '@app/core/template';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Config, ProjectStore } from '@app/core/services';
import { AuthInterceptor } from '@app/core/interceptors';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TemplateModule,
    ReactiveFormsModule
  ],
  providers: [
    Config,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: resourceProviderFactory,
      deps: [ProjectStore],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


function resourceProviderFactory(store: ProjectStore) {
  return () => store.forceGetAll();
}

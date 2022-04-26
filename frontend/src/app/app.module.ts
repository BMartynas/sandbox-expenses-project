import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { LayoutModule } from './layout/layout.module';
import { ErrorInterceptor } from './error/error.interceptor';
import { CategoriesModule } from './categories/categories.module';
import { StatisticsModule } from './statistics/statistics.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { ObligatoryModule } from './obligatory/obligatory.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    MainModule,
    CategoriesModule,
    StatisticsModule,
    LayoutModule,
    SubscriptionsModule,
    ObligatoryModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

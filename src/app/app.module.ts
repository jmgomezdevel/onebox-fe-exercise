import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { EventInfoComponent } from './pages/event-info/event-info.component';
import { HttpClientModule } from '@angular/common/http';
import { EventCardComponent } from 'src/components/event-card/event-card.component';
import { EventSessionsComponent } from 'src/components/event-sessions/event-sessions.component';
import { ShoppingCartComponent } from 'src/components/shopping-cart/shopping-cart.component';
import { sortEventsByEndDate } from 'src/pipes/events-sort.pipe';
import { SortSessionsByDatePipe } from 'src/pipes/sessions-sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatalogComponent,
    EventInfoComponent,
    EventCardComponent,
    EventSessionsComponent,
    ShoppingCartComponent,
    sortEventsByEndDate,
    SortSessionsByDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

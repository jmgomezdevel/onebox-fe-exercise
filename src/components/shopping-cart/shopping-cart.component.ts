import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Event } from 'src/models/event';
import { Product } from 'src/models/product';
import { EventService } from 'src/services/event.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent implements OnInit{

  public products: Product[] = [];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private eventService: EventService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.shoppingCartService.getProducts().subscribe((products) => {
      this.products = products;
      this.cdr.detectChanges();
    });
  }

  deleteSession(event: Event, date: string) {
    this.shoppingCartService.removeSession(event, date);
    this.eventService.modifyAvailability(event.id, date, 1);
  }
}

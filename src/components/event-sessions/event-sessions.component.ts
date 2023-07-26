import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { EventInfo } from 'src/models/event-info';
import { Product } from 'src/models/product';
import { Session } from 'src/models/session';
import { EventService } from 'src/services/event.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';

@Component({
  selector: 'app-event-sessions',
  templateUrl: './event-sessions.component.html',
  styleUrls: ['./event-sessions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventSessionsComponent implements OnInit {

  public products: Product[] = [];

  @Input()
  public eventInfo!: EventInfo;

  @Output()
  public addSession: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public removeSession: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private shoppingCartService: ShoppingCartService,
    private eventService: EventService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.shoppingCartService.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.eventService.getEventsInfo(this.eventInfo.event.id).subscribe((eventsInfo: EventInfo[]) => {
      this.cdr.detectChanges();
    });
  }

  addSessionClick(session: Session) {
    if (parseInt(session.availability) > 0) {
      this.addSession.emit(session.date);
      this.cdr.detectChanges
    }
  }

  removeSessionClick(session: Session) {
    let productInShoppingCart = this.products.find(product => product.event.id === this.eventInfo.event.id);
    if (productInShoppingCart) {
      let sessionInProduct = productInShoppingCart.sessionsProduct.find(sessionProduct => sessionProduct.date === session.date);
      if (sessionInProduct) {
        this.removeSession.emit(session.date);
        this.cdr.detectChanges();
      }
    }
  }
}

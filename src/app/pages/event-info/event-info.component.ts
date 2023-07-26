import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventInfo } from 'src/models/event-info';
import { Product } from 'src/models/product';
import { EventService } from 'src/services/event.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventInfoComponent implements OnInit {

  public eventsInfoSubject$: BehaviorSubject<EventInfo[]> = new BehaviorSubject<EventInfo[]>([]);
  public eventsInfo$: Observable<EventInfo[]> = this.eventsInfoSubject$.asObservable();

  public eventInfoSubject$: BehaviorSubject<EventInfo | undefined> = new BehaviorSubject<EventInfo | undefined>(undefined);
  public eventInfo$: Observable<EventInfo | undefined> = this.eventInfoSubject$.asObservable();

  public products: Product[] = [];

  constructor(
    private eventService: EventService,
    private shoppingCartService: ShoppingCartService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getEventInfo();
    this.getProductsFromCart();
  }

  getEventInfo() {
    this._route.params.forEach((params: Params) => {
      this.eventService.getEventsInfo(params['id']).subscribe((eventsInfo: EventInfo[]) => {
        this.eventsInfoSubject$.next(eventsInfo);
        let eventInfo = eventsInfo.find(eventInfo => eventInfo.event.id === params['id']);
        if (eventInfo) {
          this.eventInfoSubject$.next(eventInfo);
        } else {
          this.eventInfoSubject$.next(undefined);
        }
      });
    });
  }

  sortSessionsByASC(eventInfo: EventInfo): EventInfo {
    eventInfo.sessions = eventInfo.sessions.sort((a, b) => parseInt(b.date) - parseInt(a.date));
    return eventInfo;
  }

  getProductsFromCart() {
    this.shoppingCartService.getProducts().subscribe((products) => {
      this.products = products;
      this.getEventInfo();
    });
  }

  addSession(date: string) {
    let eventInfo = this.eventInfoSubject$.getValue();
    if (eventInfo) {
      this.shoppingCartService.addSession(eventInfo.event, date);
      this.eventService.modifyAvailability(eventInfo.event.id, date, -1);
    }
  }

  removeSession(date: string) {
    let eventInfo = this.eventInfoSubject$.getValue();
    if (eventInfo) {
      this.shoppingCartService.removeSession(eventInfo.event, date);
      this.eventService.modifyAvailability(eventInfo.event.id, date, 1);
    }
  }
}

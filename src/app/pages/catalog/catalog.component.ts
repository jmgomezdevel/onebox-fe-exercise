import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EventService } from 'src/services/event.service';
import { Event } from 'src/models/event';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit{

  public eventsSubject$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  public events$: Observable<Event[]> = this.eventsSubject$.asObservable();

  constructor(
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEventsFromMock();
  }

  getEventsFromMock() {
    this.eventService.getEvents().subscribe((events:any) => {
        this.eventsSubject$.next(events);
      }
    );
  }

  goEventInfo(id: string){
    this.router.navigate(['/', id]);
  }
}

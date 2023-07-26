import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EventInfo } from 'src/models/event-info';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsInfoSubject$: BehaviorSubject<EventInfo[]> = new BehaviorSubject<EventInfo[]>([]);
  private eventsInfo: EventInfo[];

  constructor(private http: HttpClient) {
    this.eventsInfo = [];
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('../assets/data/events.json');
  }

  getEventsInfo(id: string): Observable<EventInfo[]> {
    let eventIndex = this.eventsInfo.findIndex(eventInfo => eventInfo.event.id === id)
    if (eventIndex === -1) {
      this.http.get<EventInfo>('../assets/data/event-info-' + id + '.json').subscribe((eventInfo) => {
        this.eventsInfo.push(eventInfo);
        this.eventsInfoSubject$.next(this.eventsInfo);
        return this.eventsInfoSubject$.asObservable();
      });
    }
    return this.eventsInfoSubject$.asObservable();
  }

  modifyAvailability(eventId: string, date: string, amount: number) {
    let eventInfoId = this.eventsInfo.findIndex(eventInfo => eventInfo.event.id === eventId);
    if (eventInfoId >= 0) {
      let sessionIndex = this.eventsInfo[eventInfoId].sessions.findIndex(session => session.date === date);
      this.eventsInfo[eventInfoId].sessions[sessionIndex].availability = parseInt(this.eventsInfo[eventInfoId].sessions[sessionIndex].availability) + amount + "";
      this.eventsInfoSubject$.next(this.eventsInfo);
    }
  }
}

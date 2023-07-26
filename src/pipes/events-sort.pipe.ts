import { Pipe, PipeTransform } from '@angular/core';
import { Event } from 'src/models/event';

@Pipe({
  name: 'sortEventsByEndDate'
})
export class sortEventsByEndDate implements PipeTransform {
  transform(events: Event[], order: string): Event[] {
    if (order === 'ASC') {
      return events.sort((a, b) => parseInt(a.endDate) - parseInt(b.endDate));
    } else {
      return events;
    }
  }
}
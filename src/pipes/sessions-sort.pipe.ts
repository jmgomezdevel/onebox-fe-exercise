import { Pipe, PipeTransform } from '@angular/core';
import { Session } from 'src/models/session';

@Pipe({
  name: 'sortSessionsByDate'
})
export class SortSessionsByDatePipe implements PipeTransform {
  transform(sessions: Session[], order: string): Session[] {
    if (order === 'ASC') {
      return sessions.sort((a, b) => parseInt(a.date) - parseInt(b.date));
    } else {
      return sessions;
    }
  }
}
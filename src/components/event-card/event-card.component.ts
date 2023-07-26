import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from 'src/models/event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCardComponent implements OnInit{

  @Input()
  public event!: Event;

  @Output()
  public goEventInfo: EventEmitter<string> = new EventEmitter<string>();

  constructor(){}

  ngOnInit(): void {
  }

  goEventPage() {
    this.goEventInfo.emit(this.event.id);
  }
}

import { Component, Input } from '@angular/core';
import { Event } from '../../providers/event/event';
import { EventsService } from '../../providers/event/event.service';


@Component({
    // moduleId: module.id,
    selector: 'event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.sass']
})
export class EventDetailsComponent {

  @Input()
  eventToShow: Event;
  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private eventsService: EventsService) {}

  createEvent(event: Event) {
    this.eventsService.createEvent(event).then((newEvent: Event) => {
      this.createHandler(newEvent);
    });
  }

  updateEvent(event: Event): void {
    this.eventsService.updateEvent(event).then((updatedEvent: Event) => {
      this.updateHandler(updatedEvent);
    });
  }

  deleteEvent(eventId: String): void {
    this.eventsService.deleteEvent(eventId).then((deletedEventId: String) => {
      console.log("DELETED");
      console.log(deletedEventId);
      this.deleteHandler(deletedEventId);
    });
  }
}
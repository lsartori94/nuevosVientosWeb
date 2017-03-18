import { Component, Input} from '@angular/core';
import { Event } from '../../providers/event/event';
import { People } from '../../providers/people/people';

import { EventsService } from '../../providers/event/event.service';


@Component({
    // moduleId: module.id,
    selector: 'event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss']
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

  addingParticipant: boolean = false;
  name: string = '';
  bio: string = '';

  constructor (private eventsService: EventsService) {}

  beginAdition(){
    this.addingParticipant = true;
  }

  cancelAddition() {
    this.name = '';
    this.bio = '';
    this.addingParticipant = false;
  }

  saveParticipant() {
    let participant = {
      "name": this.name,
      "bio": this.bio
    }
    this.eventToShow.participants.push(participant);
    this.cancelAddition();
  }

  deleteParticipant(idx) {
    this.eventToShow.participants.splice(idx, 1);
  }

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
      this.deleteHandler(deletedEventId);
    });
  }
}
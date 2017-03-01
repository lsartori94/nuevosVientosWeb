import { Component, OnInit } from '@angular/core';
import { Event } from '../../providers/event/event';
import { People } from '../../providers/people/people';
import { EventsService } from '../../providers/event/event.service';
import { EventDetailsComponent } from '../../pages/event-details/event-details.component';

@Component({
  // moduleId: module.id,
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.sass'],
  entryComponents:[EventDetailsComponent],
  providers: [EventsService]
})

export class AdminPageComponent implements OnInit {

  events: Event[] = [];
  selectedEvent: Event;

  constructor(private eventService: EventsService) { }

  ngOnInit() {
     this.eventService
      .getEvents()
      .then((events: Event[]) => {
        this.events = events;
      });
  }

  private getIndexOfEvent = (eventId: String) => {
    return this.events.findIndex((event) => {
      return event._id === eventId;
    });
  }

  selectEvent(event: Event) {
    this.selectedEvent = event
  }

  createNewEvent() {
    var event: Event = {
      _id:"",
      name: "",
      image: "",
      description: "",
      date: "",
      participants: Array<string>()
    };

    // By default, a newly-created event will have the selected state.
    this.selectEvent(event);
  }

  deleteEvent = (eventId: String) => {
    var idx = this.getIndexOfEvent(eventId);
    if (idx !== -1) {
      this.events.splice(idx, 1);
      this.selectEvent(null);
    }
    return this.events;
  }

  addEvent = (event: Event) => {
    this.events.push(event);
    this.selectEvent(event);
    return this.events;
  }

  updateEvent = (event: Event) => {
    console.log(event);
    var idx = this.getIndexOfEvent(event._id);
    if (idx !== -1) {
      this.events[idx] = event;
      this.selectEvent(event);
    }
    return this.events;
  }
}
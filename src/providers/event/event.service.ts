import { Injectable } from '@angular/core';
import { Event } from './event';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Backend } from '../appConstants';

@Injectable()
export class EventsService {

    constructor (private http: Http, private backend: Backend) {}

    // get("/api/events")
    getEvents(): Promise<Event[]> {
      return this.http.get(this.backend.eventsAPI)
                 .toPromise()
                 .then(response => response.json() as Event[])
                 .catch(this.handleError);
    }

    // post("/api/events")
    createEvent(newEvent: Event): Promise<Event> {
      return this.http.post(this.backend.eventsAPI, newEvent)
                 .toPromise()
                 .then(response => response.json() as Event)
                 .catch(this.handleError);
    }

    // get("/api/events/:id") endpoint not used by Angular app

    // delete("/api/events/:id")
    deleteEvent(delEventId: String): Promise<String> {
      return this.http.delete(this.backend.eventsAPI + '/' + delEventId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/events/:id")
    updateEvent(putEvent: Event): Promise<Event> {
      var putUrl = this.backend.eventsAPI + '/' + putEvent._id;
      return this.http.put(putUrl, putEvent)
                 .toPromise()
                 .then(response => response.json() as Event)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
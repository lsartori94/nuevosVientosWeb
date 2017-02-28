import { Injectable } from '@angular/core';
import { Organizer } from './organizer';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Backend } from '../appConstants';

@Injectable()
export class PeopleService {

    constructor (private http: Http, private backend: Backend) {}

    // get("/api/people")
    getEvents(): Promise<Organizer[]> {
      return this.http.get(this.backend.organizersAPI)
                 .toPromise()
                 .then(response => response.json() as Organizer[])
                 .catch(this.handleError);
    }

    // post("/api/people")
    createEvent(newPerson: Organizer): Promise<Organizer> {
      return this.http.post(this.backend.organizersAPI, newPerson)
                 .toPromise()
                 .then(response => response.json() as Organizer)
                 .catch(this.handleError);
    }

    // get("/api/people/:id") endpoint not used by Angular app

    // delete("/api/people/:id")
    deleteEvent(delPersonId: String): Promise<String> {
      return this.http.delete(this.backend.organizersAPI + '/' + delPersonId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/people/:id")
    updateEvent(putPerson: Organizer): Promise<Organizer> {
      var putUrl = this.backend.organizersAPI + '/' + putPerson._id;
      return this.http.put(putUrl, putPerson)
                 .toPromise()
                 .then(response => response.json() as Organizer)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
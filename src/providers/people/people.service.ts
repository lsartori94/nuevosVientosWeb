import { Injectable } from '@angular/core';
import { People } from './people';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Backend } from '../appConstants';

@Injectable()
export class PeopleService {

    constructor (private http: Http, private backend: Backend) {}

    // get("/api/people")
    getEvents(): Promise<People[]> {
      return this.http.get(this.backend.peopleAPI)
                 .toPromise()
                 .then(response => response.json() as People[])
                 .catch(this.handleError);
    }

    // post("/api/people")
    createEvent(newPerson: People): Promise<People> {
      return this.http.post(this.backend.peopleAPI, newPerson)
                 .toPromise()
                 .then(response => response.json() as People)
                 .catch(this.handleError);
    }

    // get("/api/people/:id") endpoint not used by Angular app

    // delete("/api/people/:id")
    deleteEvent(delPersonId: String): Promise<String> {
      return this.http.delete(this.backend.peopleAPI + '/' + delPersonId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/people/:id")
    updateEvent(putPerson: People): Promise<People> {
      var putUrl = this.backend.peopleAPI + '/' + putPerson._id;
      return this.http.put(putUrl, putPerson)
                 .toPromise()
                 .then(response => response.json() as People)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
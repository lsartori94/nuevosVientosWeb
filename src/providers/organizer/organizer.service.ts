import { Injectable } from '@angular/core';
import { Organizer } from './organizer';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Backend } from '../appConstants';

@Injectable()
export class OrganizerService {
    backend = Backend;

    constructor (private http: Http) {}

    // get("/api/people")
    getOrganizers(): Promise<Organizer[]> {
      return this.http.get(this.backend.organizersAPI)
                 .toPromise()
                 .then(response => response.json().data as Organizer[])
                 .catch(this.handleError);
    }

    // post("/api/people")
    createOrganizer(newPerson: Organizer): Promise<Organizer> {
      return this.http.post(this.backend.organizersAPI, newPerson)
                 .toPromise()
                 .then(response => response.json().data as Organizer)
                 .catch(this.handleError);
    }

    // get("/api/people/:id") endpoint not used by Angular app

    // delete("/api/people/:id")
    deleteOrganizer(delPersonId: String): Promise<String> {
      return this.http.delete(this.backend.organizersAPI + '/' + delPersonId)
                 .toPromise()
                 .then(response => response.json().data as String)
                 .catch(this.handleError);
    }

    // put("/api/people/:id")
    updateOrganizer(putPerson: Organizer): Promise<Organizer> {
      var putUrl = this.backend.organizersAPI + '/' + putPerson._id;
      return this.http.put(putUrl, putPerson)
                 .toPromise()
                 .then(response => response.json().data as Organizer)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
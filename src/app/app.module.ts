import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule, RoutableComponents } from './app-routing.module';

import { AppComponent } from './app.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../providers/in-memory-data.service';

import { EventsService } from '../providers/event/event.service';
import { PeopleService } from '../providers/people/people.service';
import { OrganizerService } from '../providers/organizer/organizer.service';

@NgModule({
  declarations: [
    AppComponent,
    RoutableComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 600 })
  ],
  providers: [
    EventsService,
    PeopleService,
    OrganizerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { People } from '../people/people';

export class Event {
    "_id"?: string;
    "name": string;
    "image"?: any;
    "description": string;
    "date": string;
    "participants": Array<any>;
}
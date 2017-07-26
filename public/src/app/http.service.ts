import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Fighter } from './fighter'; // some class needed for observables if any

@Injectable()

export class HttpService {
  observedcurrentfighters = new BehaviorSubject(null);
  observedfighters = new BehaviorSubject(null);
  // subscription update method is at the bottom of the httpservicemethods snippet
  constructor(private _http: Http) {}
  // DATABASE INTERACTIONS
  getAllfighters() {
    return this._http.get('/dbfighters')
    .map( data => data.json() )
    .toPromise();
  }
  getThisfighter(id) {
    return this._http.get(`/dbfighters/${id}`)
    .map( data => data.json() )
    .toPromise();
  }
  createfighter(fighter) {
    return this._http.post('/dbfighters/add', fighter)
    .map( data => data.json() )
    .toPromise();
  }
  updatefighter(fighter) {
    return this._http.post('/dbfighters/update/', fighter)
    .map( data => data.json() )
    .toPromise();
  }
  deletefighter(fighter) {
    return this._http.post('/dbfighters/delete/', fighter)
    .map( data => data.json() )
    .toPromise();
  }
  findGitHubUser(username: String){
    console.log(username);
    return this._http.get(`http://api.github.com/users/${username}`)
    .map(data=>data.json())
    .toPromise();
  }
  // UPDATE SUBSCRIPTION
  updatefighters(fighters){
    this.observedfighters.next(fighters);
  }
  updatecurrentfighters(fighters){
    this.observedcurrentfighters.next(fighters);
  }
}


// GITHUB KEY: 58cea58a0254c4e1b3c4ba2e15d352b3cabdd8d6

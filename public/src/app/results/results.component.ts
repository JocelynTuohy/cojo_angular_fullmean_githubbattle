import { Component, OnInit, OnDestroy } from '@angular/core';
import { Fighter } from '../fighter'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpService} from '../http.service';
import { Subscription } from 'rxjs/Subscription'
import { Router } from '@angular/router'
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  currentfighters: Array<Fighter>
  subscription: Subscription
  constructor(private _httpService: HttpService, private _router: Router) {
    this.subscription = _httpService.observedcurrentfighters.subscribe(
        (updatedcurrentfighters)=>{this.currentfighters = updatedcurrentfighters;},
        (err)=>{},
        ()=>{}
    )
  }

  ngOnInit() {
  }
  resetBattle(){
    this.currentfighters = [];
    this.updatecurrentfighters();
    this._router.navigate(['']);
  }
  updatecurrentfighters(){
    this._httpService.updatecurrentfighters(this.currentfighters)
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

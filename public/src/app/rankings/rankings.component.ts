import { Fighter } from '../fighter'
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpService} from '../http.service';
import { Subscription } from 'rxjs/Subscription'
import { Router } from '@angular/router'
@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {
  fighters: Array<Fighter>;
  subscription: Subscription;
  title: String = "Rankings"
  constructor(private _httpService: HttpService, private _router: Router) {
    this.subscription = _httpService.observedfighters.subscribe(
        (updatedfighters)=>{this.fighters = updatedfighters;},
        (err)=>{},
        ()=>{}
    )
  }
  ngOnInit() {
    this.getAllfighters();
  }
  getAllfighters(){
    this._httpService.getAllfighters()
    .then((fighters)=>{
      this.fighters = fighters;
      this.updatefighters();
    })
    .catch((err)=>console.log(err));
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  updatefighters(){
    this._httpService.updatefighters(this.fighters)
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Fighter } from '../fighter'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpService} from '../http.service';
import { Subscription } from 'rxjs/Subscription'
import { Router } from '@angular/router'

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  player1: Fighter = new Fighter();
  player2: Fighter = new Fighter();
  player1error: Boolean;
  player2error: Boolean;
  currentfighters: Array<Fighter>;
  subscription: Subscription; 
  constructor(private _httpService: HttpService, private _router: Router) {
    this.subscription = _httpService.observedcurrentfighters.subscribe(
        (updatedcurrentfighters)=>{this.currentfighters = updatedcurrentfighters;},
        (err)=>{},
        ()=>{}
    )
  }

  ngOnInit() {
    this.player1error = this.player2error = false;
    this.player1 = {imageUrl: "", username: "", score: undefined };
    this.player2 = {imageUrl: "", username: "", score: undefined };
    this.currentfighters = [this.player1, this.player2];
    this.updatecurrentfighters();
  }
  getPlayer(num){
    this.player1error = this.player2error = false;
    let player = num==1 ? this.player1 : this.player2;
    this._httpService.findGitHubUser(player.username)
      .then((user)=>{
        player.imageUrl = user.avatar_url;
        player.score = (user.public_repos + user.followers) * 12;
        num==1 ? this.player1 = player : this.player2 = player;
        this.currentfighters = [this.player1, this.player2];
        this.updatecurrentfighters();
      })
      .catch((err)=>{
        console.log(err);
        num==1 ? this.player1error = true : this.player2error = true;
      })
  }
  battle(){
    //ADD TO DATABASE
    this._httpService.createfighter(this.player1);
    this._httpService.createfighter(this.player2);
    this._router.navigate(["results"]);
  }
  updatecurrentfighters(){
    this._httpService.updatecurrentfighters(this.currentfighters)
  }
}

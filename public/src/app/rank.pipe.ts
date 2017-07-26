import { Pipe, PipeTransform } from '@angular/core';
import { Fighter } from './fighter'

@Pipe({
  name: 'rank'
})
export class RankPipe implements PipeTransform {

  transform(fighters: Array<Fighter>): any {
    fighters.sort((a: Fighter, b: Fighter) => {
      if (a.score < b.score) {
        return 1;
      } else if (a.score > b.score) {
        return -1;
      } else {
        return 0;
      }
    });
    return fighters;
  }

}

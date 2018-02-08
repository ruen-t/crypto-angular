import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Subject } from 'rxjs/Subject';
class Pair {
  pairing_id: number
  primary_currency: string
  seconary_currency: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  title = 'my first app';
  pairs: Pair[] = []
  api = "https://crypfolio.azurewebsites.net/bitexthai.php";
  constructor(private http: Http) {
    console.log('hello');
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple',
      pageLength: -1,
      reponsive: true
    
    
    };
    this.http.get(this.api)
    .map(this.extractData)
    .subscribe((res) => {
      this.pairs = res;
      this.dtTrigger.next();
     
      var arr = [];
      for(var x in res){
        arr.push(res[x]);
       // console.log(res[x]);
      }
      this.pairs = arr;
     
   
      //console.log(pair);

    })
  }
  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

 
}

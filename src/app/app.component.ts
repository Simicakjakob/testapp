import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {iUporabnik} from '../../../uporabnik'
import {HttpClient} from '@angular/common/http';
import {HttpClientModule,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs';
import { JsonSerializer, throwError } from 'typescript-json-serializer';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ] 
}) 


export class AppComponent implements OnInit {
  columnsToDisplay: string[]= ['ime','priimek','datum_rojstva','aktiven'];
  
  defaultSerializer = new JsonSerializer();

  
  constructor(private http:HttpClient){

  }
  headers = new HttpHeaders({
    'Content-Type':'application/json'
  });

  title = 'testapp';
  
  all_users =  this.http.get('http://localhost:3000/users/all',{headers:this.headers}).pipe(map((res:any)=>res));
  
  
  dataSource= this.all_users
  clickedRows = new Set<iUporabnik>();
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement:iUporabnik | null=null;
  Toggle:boolean=false;
  Toggle_create:boolean=false;


  doSomething(string : any)
  {
      
  }
  
   ngOnInit() {
  
}


}

 





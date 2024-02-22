import { Component, Input, OnInit, Output } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { FormControl, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {HttpClientModule,HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs';
import {provideNativeDateAdapter} from '@angular/material/core';
import { iUporabnik } from '../../../../uporabnik';
import { FormBuilder } from '@angular/forms';
import { EventEmitter } from 'stream';
import moment from 'moment';
import { Console } from 'console';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  providers: [provideNativeDateAdapter()],

})
export class EditComponent implements OnInit {
@Input() userToEdit:iUporabnik | null = null;


ime_form='';
priimek_form='';
datum_rojstva_form=new Date();
aktiven_form=false;
opis_form='';

//@Output() onImeChange = new EventEmitter();
//@Output() onPriimekChange = new EventEmitter();
//@Output() onDatumChange = new EventEmitter();
//@Output() onAktivenChange = new EventEmitter();
//@Output() onOpisChange = new EventEmitter();



 

  
  constructor(private router:Router,
              private http:HttpClient,
              private formBuilder: FormBuilder,
              //private toastr: ToastrService
    ){  
   }
    
  

  
  
    ngOnInit(): void {
      if(this.userToEdit!==null)
      {
        this.ime_form=this.userToEdit.ime;
        this.priimek_form=this.userToEdit.priimek;
        let pretvoriDat= new Date(this.userToEdit.datum_rojstva);
        console.log(pretvoriDat);
        
        this.datum_rojstva_form=pretvoriDat;
        this.aktiven_form=this.userToEdit.aktiven;
        this.opis_form=this.userToEdit.opis;
      }
    
  }

  

  async onSubmit(){
    console.log(this.userToEdit)
    if (this.userToEdit == null)
    {
      /*post*/
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type','application/json');
      const user ={
        ime:  this.ime_form,
        priimek: this.priimek_form,
        datum_rojstva: moment(this.datum_rojstva_form).format('YYYY-MM-DD'),
        aktiven:this.aktiven_form,
        opis:this.opis_form
      }
      await this.http.post('http://localhost:3000/users/register',user,{headers : headers})
       .pipe(map((res: any) => res)).subscribe();
      //this.toastr.success('You are now registered.', 'Success!');

    }
    else{
        /*put*/
        let headers = new HttpHeaders();
      headers = headers.append('Content-Type','application/json');
      const user ={
        ime:  this.ime_form,
        priimek: this.priimek_form,
        datum_rojstva: moment(this.datum_rojstva_form).format('YYYY-MM-DD'),
        aktiven:this.aktiven_form,
        opis:this.opis_form
      }
      try{
        console.log('http://localhost:3000/users/update/'+this.userToEdit._id);
      let result = await this.http.put('http://localhost:3000/users/update/'+this.userToEdit._id,user,{headers : headers})
       .pipe(map((res: any) => res)).subscribe (data => {
        console.log(data);
       });
       

      }catch(err){
        console.log(err);
      }
      
      //this.toastr.success('You are now registered.', 'Success!');
    }
    }
}


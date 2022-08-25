import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../service/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Timestamp} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allForm!: FormGroup;
  oneForm!: FormGroup;
  formCSV!: FormGroup;
  showField: Boolean = false;
  today: Date =  new Date();

  constructor(private http: HttpService, private router: Router, private route: ActivatedRoute) {
    this.today.setDate(this.today.getDate());
  }

  ngOnInit(): void {
    this.initForms();
  }

  initForms(){
    this.allForm = new FormGroup({
      'dateBegin1': new FormControl(this.today.toISOString().slice(0,10), Validators.required),
      'timeBegin1': new FormControl(this.today.toISOString().slice(11,16), Validators.required),
      'dateEnd1': new FormControl(this.today.toISOString().slice(0,10), [Validators.required]),
      'timeEnd1': new FormControl(this.today.toISOString().slice(11,16), Validators.required)
    })

    this.oneForm = new FormGroup({
      'dateBegin2': new FormControl(this.today.toISOString().slice(0,10), Validators.required),
      'timeBegin2': new FormControl(null, Validators.required),
      'dateEnd2': new FormControl(this.today.toISOString().slice(0,10), [Validators.required]),
      'timeEnd2': new FormControl(null, Validators.required),
      'dataName2': new FormControl(null, Validators.required)
    })

    this.formCSV = new FormGroup({
      'dateBegin3': new FormControl(this.today.toISOString().slice(0,10), Validators.required),
      'timeBegin3': new FormControl(null, Validators.required),
      'dateEnd3': new FormControl(this.today.toISOString().slice(0,10), [Validators.required]),
      'timeEnd3': new FormControl(null, Validators.required),
      'dataName3': new FormControl(null, Validators.required)
    })
  }


  routeToAll() {
    this.router.navigate(['all/' + this.allForm.value.dateBegin1 + '/' + this.allForm.value.timeBegin1 + '/' + this.allForm.value.dateEnd1 + '/' + this.allForm.value.timeEnd1], {relativeTo: this.route});
  }

  routeToOne() {

  }

  generateCSV() {

  }

  showNameField(event: any) {
    if (event.target.checked) {
      this.showField = true;
    } else {
      this.showField = false;
    }
  }
}

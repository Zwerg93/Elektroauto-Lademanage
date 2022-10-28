import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../http-service/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {timer, Timestamp} from "rxjs";
import {ValidatorService} from "../validator-service/validator.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allForm!: FormGroup;
  oneForm!: FormGroup;
  csvForm!: FormGroup;
  private _showField: Boolean = false;
  today: Date = new Date();
  todayMinusOneHour: Date = new Date();

  constructor(private http: HttpService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private validator: ValidatorService) {
    this.today.setDate(this.today.getDate());
    this.today.setHours(this.today.getHours() + 2);
    this.todayMinusOneHour.setHours( this.todayMinusOneHour.getHours() + 1 );
  }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.allForm = this.fb.group({
        dateBegin1: [this.today.toISOString().slice(0, 10), [Validators.required]],
        timeBegin1: [this.todayMinusOneHour.toISOString().slice(11, 16), [Validators.required]],
        dateEnd1: [this.today.toISOString().slice(0, 10), [Validators.required]],
        timeEnd1: [this.today.toISOString().slice(11, 16), [Validators.required]]
      },
      {
        validator: this.validator.match('dateBegin1','timeBegin1', 'dateEnd1', 'timeEnd1'),
      });

    this.oneForm = this.fb.group({
        dateBegin2: [this.today.toISOString().slice(0, 10), [Validators.required]],
        timeBegin2: [this.todayMinusOneHour.toISOString().slice(11, 16), [Validators.required]],
        dateEnd2: [this.today.toISOString().slice(0, 10), [Validators.required]],
        timeEnd2: [this.today.toISOString().slice(11, 16), [Validators.required]],
        dataName2: ['', [Validators.required]]
      },
      {
        validator: this.validator.match('dateBegin2','timeBegin2', 'dateEnd2', 'timeEnd2'),
      });

    this.csvForm = this.fb.group({
        dateBegin3: [this.today.toISOString().slice(0, 10), [Validators.required]],
        timeBegin3: [this.todayMinusOneHour.toISOString().slice(11, 16), [Validators.required]],
        dateEnd3: [this.today.toISOString().slice(0, 10), [Validators.required]],
        timeEnd3: [this.today.toISOString().slice(11, 16), [Validators.required]],
        dataName3: ['', []]
      },
      {
        validator: [this.validator.match('dateBegin3','timeBegin3', 'dateEnd3', 'timeEnd3')
          //, this.validator.csvValidator('dateBegin3','timeBegin3', 'dateEnd3', 'timeEnd3', 'dataName3')
        ]
      });
  }


  routeToAll() {
    this.router.navigate(['all/' + this.allForm.value.dateBegin1 + '/' + this.allForm.value.timeBegin1 + '/' + this.allForm.value.dateEnd1 + '/' + this.allForm.value.timeEnd1], {relativeTo: this.route});
  }

  routeToOne() {
    this.router.navigate(['one/' + this.oneForm.value.dataName2 + "/" + this.oneForm.value.dateBegin2 + '/' + this.oneForm.value.timeBegin2 + '/' + this.oneForm.value.dateEnd2 + '/' + this.oneForm.value.timeEnd2], {relativeTo: this.route});
  }


  // AUSPROBIEREN
  generateCSV() {
    if(this.checkCSV()) {
      if (this.csvForm.value.dataName3 == "") {
        this.csvForm.setErrors(null);
        timer(6000).subscribe(x => {
          // getFiles() gibt die Liste zurück
          this.http.createCSV(this.csvForm.value.dateBegin3, this.csvForm.value.dateEnd3, this.csvForm.value.timeBegin3, this.csvForm.value.timeEnd3, "C:/angular1/monitor.csv").subscribe(value => {
          }, error => console.log(error));
        })

      } else {
        timer(6000).subscribe(x => {
        this.http.createCSVByName(this.csvForm.value.dateBegin3, this.csvForm.value.dateEnd3, this.csvForm.value.timeBegin3, this.csvForm.value.timeEnd3, "C:/angular1/monitor.csv", this.csvForm.value.dataName3).subscribe(value => {
        }, error => console.log(error));
        })
      }
    } else {
      this.csvForm.controls['dataName3'].setErrors({noValues: true});
    }
  }

  checkCSV(): Boolean{
    // TODO
    /*let csvValue = [];
    this.http.getLogEntries(this.csvForm.value.dateBegin3, this.csvForm.value.timeBegin3, this.csvForm.value.dateEnd3, this.csvForm.value.timeEnd3).subscribe(value => {
     csvValue = value;
      console.log(value.length);
    }, error => {
      console.log(error);
    });
    if(csvValue.length == 0){
      return false;
    }*/
    return true;
    /*
    let check = true;
    this.http.getLogEntries(this.csvForm.value.dateBegin3, this.csvForm.value.timeBegin3, this.csvForm.value.dateEnd3, this.csvForm.value.timeEnd3).subscribe(value => {
      let csvValue = value;
      if(csvValue.length == 0){
        check = false;
      }
    }, error => {
      console.log(error);
    });
    return check;
    */
  }



  // AUSPROBIEREN ENDE

  showNameField(event: any) {
    if (event.target.checked) {
      this._showField = true;
    } else {
      this._showField = false;
    }
  }

  get showField(): Boolean {
    return this._showField;
  }

  get getOneFormControl(){
    return this.oneForm.controls;
  }

  get getAllFormControl(){
    return this.allForm.controls;
  }

  get getCsvFormControl(){
    return this.csvForm.controls;
  }
}

import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {HttpService} from "../http-service/http.service";
import {timer} from "rxjs";
import {HomeComponent} from "../home/home.component";

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  csvValue: any = [];
  // TODO
  //private homeComponent: HomeComponent;

  constructor(private http: HttpService) {
  }


  match(dateBegin: string, timeBegin: string, dateEnd: string, timeEnd: string) {
    return (formGroup: FormGroup) => {
      const dateBeginControl = formGroup.controls[dateBegin];
      const dateEndControl = formGroup.controls[dateEnd];
      const timeBeginControl = formGroup.controls[timeBegin];
      const timeEndControl = formGroup.controls[timeEnd];

      if (dateBeginControl.value > dateEndControl.value) {
        dateEndControl.setErrors({dateMustBeBigger: true});
      } else {
        dateEndControl.setErrors(null);
      }

      if (dateBeginControl.value == dateEndControl.value) {
        if (timeBeginControl.value >= timeEndControl.value) {
          dateBeginControl.setErrors({timeMustBeBigger: true});
        } else {
          dateBeginControl.setErrors(null);
        }
      }
      return null;
    };
  }


  csvValidator(dateBegin: string, timeBegin: string, dateEnd: string, timeEnd: string, name: string) {
    return (formGroup: FormGroup) => {
      const dateBeginControl = formGroup.controls[dateBegin];
      const dateEndControl = formGroup.controls[dateEnd];
      const timeBeginControl = formGroup.controls[timeBegin];
      const timeEndControl = formGroup.controls[timeEnd];
      const nameControl = formGroup.controls[name];

      // TODO
      // erst überprüfen wenn button gedrückt wird und nicht scho n vorher, da sonst buggy
      //if(nameControl.value == "" && this.homeComponent.showField == false){
        if(nameControl.value == ""){
        this.http.getLogEntries(dateBeginControl.value, timeBeginControl.value, dateEndControl.value, timeEndControl.value).subscribe(value => {
          this.csvValue = value;
        }, error => {
          console.log(error);
        });

        timer(500).subscribe(x => {
          if (this.csvValue.length == 0) {
            nameControl.setErrors({noValues: true});
          } else {
            nameControl.setErrors(null);
          }
        })
      } else {
        this.http.getLogEntriesByName(nameControl.value, dateBeginControl.value, timeBeginControl.value, dateEndControl.value, timeEndControl.value).subscribe(value => {
          this.csvValue = value;
          console.log(this.csvValue);
        }, error => {
          console.log(error);
        });

        timer(500).subscribe(x => {
          if (this.csvValue.length == 0) {
            nameControl.setErrors({noValues: true});
          } else {
            nameControl.setErrors(null);
          }
        })
      }

      return null;
    }


  }

}

import {Component, OnInit} from '@angular/core';
import {HttpService} from "../service/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, timer} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  dateBegin1: any | undefined;
  timeBegin1: any | undefined;
  dateEnd1: any | undefined;
  timeEnd1: any | undefined;
  dateBegin2: any | undefined;
  timeBegin2: any | undefined;
  dateEnd2: any | undefined;
  timeEnd2: any | undefined;
  dataName2: any | undefined;
  dateBegin3: any | undefined;
  timeBegin3: any | undefined;
  dateEnd3: any | undefined;
  timeEnd3: any | undefined;
  dataName3: any | undefined;
  showField3: Boolean = false;
  dataName4: any | undefined;
  error1: Boolean = false;
  error2: Boolean = false;
  error3: Boolean = false;
  error4: Boolean = false;
  errorMessage1: string | undefined;
  errorMessage2: string | undefined;
  errorMessage3: string | undefined;
  errorMessage4: string | undefined;
  csvValue: any | undefined;

  constructor(private http: HttpService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  routeToAll() {
    // Fehlerüberprüfung
    if (this.dateBegin1 != undefined && this.dateEnd1 != undefined && this.timeBegin1 != undefined && this.timeEnd1 != undefined) {
      if (this.dateBegin1 <= this.dateEnd1) {
        if (this.dateBegin1 == this.dateEnd1) {
          if (this.timeBegin1 < this.timeEnd1) {
            this.router.navigate(['all/' + this.dateBegin1 + '/' + this.timeBegin1 + '/' + this.dateEnd1 + '/' + this.timeEnd1], {relativeTo: this.route});
          } else {
            this.error1 = true;
            this.errorMessage1 = "Die Startzeit darf bei Uhrzeiten am gleichen Tag nicht hinter der Endzeit liegen!";
          }
        } else {
          this.router.navigate(['all/' + this.dateBegin1 + '/' + this.timeBegin1 + '/' + this.dateEnd1 + '/' + this.timeEnd1], {relativeTo: this.route});
        }
      } else {
        this.error1 = true;
        this.errorMessage1 = "Das Startdatum darf nicht hinter dem Enddatum liegen!";
      }
    } else {
      this.error1 = true;
      this.errorMessage1 = "Bitte füllen Sie alle Parameter aus!";
    }
  }

  routeToOne() {
    // Fehlerüberprüfung
    if (this.dateBegin2 != undefined && this.dateEnd2 != undefined && this.timeBegin2 != undefined && this.timeEnd2 != undefined && this.dataName2) {
      if (this.dateBegin2 <= this.dateEnd2) {
        if (this.dateBegin2 == this.dateEnd2) {
          if (this.timeBegin2 < this.timeEnd2) {
            this.router.navigate(['one/' + this.dataName2 + "/" + this.dateBegin2 + '/' + this.timeBegin2 + '/' + this.dateEnd2 + '/' + this.timeEnd2], {relativeTo: this.route});
          } else {
            this.error2 = true;
            this.errorMessage2 = "Die Startzeit darf bei Uhrzeiten am gleichen Tag nicht gleich wie die Endzeit sein oder hinter ihr liegen!";
          }
        } else {
          this.router.navigate(['one/' + this.dataName2 + "/" + this.dateBegin2 + '/' + this.timeBegin2 + '/' + this.dateEnd2 + '/' + this.timeEnd2], {relativeTo: this.route});
        }
      } else {
        this.error2 = true;
        this.errorMessage2 = "Das Startdatum darf nicht hinter dem Enddatum liegen!";
      }
    } else {
      this.error2 = true;
      this.errorMessage2 = "Bitte füllen Sie alle Parameter aus!";
    }
  }

  routeToLive() {
    if (this.dataName4 != undefined) {
      this.router.navigate(['live/' + this.dataName4], {relativeTo: this.route});
    } else {
      this.error4 = true;
      this.errorMessage4 = "Bitte fühlen Sie den Parameter aus!";
    }
  }


  generateCSV() {
    // Fehlerüberprüfung
    if (this.dateBegin3 != undefined && this.dateEnd3 != undefined && this.timeBegin3 != undefined && this.timeEnd3 != undefined) {
      if (this.dateBegin3 <= this.dateEnd3) {
        if (this.dateBegin3 == this.dateEnd3) {
          if (this.timeBegin3 < this.timeEnd3) {
            if (this.dataName3 == undefined) {
              this.http.getLogEntries(this.dateBegin3, this.timeBegin3, this.dateEnd3, this.timeEnd3).subscribe(value => {
                this.csvValue = value;
              }, error => {
                console.log(error);
              });
              if (this.csvValue != undefined) {
                this.http.createCSV(this.dateBegin3, this.dateEnd3, this.timeBegin3, this.timeEnd3, "C:/angular1/monitor.csv").subscribe(value => {
                }, error => console.log(error));
                this.error3 = true;
                this.errorMessage3 = "CSV Datei wurde erfolgreich erstellt!";
              } else {
                this.error3 = true;
                this.errorMessage3 = "Zu ihrem ausgewählten Zeitraum wurden keine Daten gefunden.";
              }
            } else {
              this.http.getLogEntriesByName(this.dataName3, this.dateBegin3, this.timeBegin3, this.dateEnd3, this.timeEnd3).subscribe(value => {
                this.csvValue = value;
              }, error => {
                console.log(error)
              });
              if (this.csvValue != undefined) {
                this.http.createCSV(this.dateBegin3, this.dateEnd3, this.timeBegin3, this.timeEnd3, "C:/angular1/monitor.csv").subscribe(value => {
                }, error => console.log(error));
                this.error3 = true;
                this.errorMessage3 = "CSV Datei wurde erfolgreich erstellt!";
              } else {
                this.error3 = true;
                this.errorMessage3 = "Zu ihrem ausgewählten Zeitraum wurden keine Daten gefunden.";
              }
            }
          } else {
            this.error3 = true;
            this.errorMessage3 = "Die Startzeit darf bei Uhrzeiten am gleichen Tag nicht gleich wie die Endzeit sein oder hinter ihr liegen!";
          }
        } else {
          if (this.dataName3 == undefined) {
            this.http.getLogEntries(this.dateBegin3, this.timeBegin3, this.dateEnd3, this.timeEnd3).subscribe(value => {
              this.csvValue = value;
            }, error => {
              console.log(error)
            });
            if (this.csvValue != undefined) {
              this.http.createCSV(this.dateBegin3, this.dateEnd3, this.timeBegin3, this.timeEnd3, "C:/angular1/monitor.csv").subscribe(value => {
              }, error => console.log(error));
              this.error3 = true;
              this.errorMessage3 = "CSV Datei wurde erfolgreich erstellt!";
            } else {
              this.error3 = true;
              this.errorMessage3 = "Zu ihrem ausgewählten Zeitraum wurden keine Daten gefunden.";
            }
          } else {
            this.http.getLogEntriesByName(this.dataName3, this.dateBegin3, this.timeBegin3, this.dateEnd3, this.timeEnd3).subscribe(value => {
              this.csvValue = value;
            }, error => {
              console.log(error)
            });
            if (this.csvValue != undefined) {
              this.http.createCSV(this.dateBegin3, this.dateEnd3, this.timeBegin3, this.timeEnd3, "C:/angular1/monitor.csv").subscribe(value => {
              }, error => console.log(error));
              this.error3 = true;
              this.errorMessage3 = "CSV Datei wurde erfolgreich erstellt!";
            } else {
              this.error3 = true;
              this.errorMessage3 = "Zu ihrem ausgewählten Zeitraum wurden keine Daten gefunden.";
            }
          }
        }
      } else {
        this.error3 = true;
        this.errorMessage3 = "Das Startdatum darf nicht hinter dem Enddatum liegen!";
      }
    } else {
      this.error3 = true;
      this.errorMessage3 = "Bitte füllen Sie alle Parameter aus!";
    }
  }


  showNameField(event: any) {
    if (event.target.checked) {
      this.showField3 = true;
    } else {
      this.showField3 = false;
    }
  }


}

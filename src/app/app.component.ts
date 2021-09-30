import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from  'src/app/dialog/dialog.component'


export interface DialogData {
  review: string;
  rating: number;
}

const URL: string = "http://localhost:5000"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'populateFront';

  item: any;
  data!: DialogData

  constructor(private http:HttpClient, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.get_data()
  }

  get_data(){
    this.http.get(`${URL}/item/1`).subscribe(data =>{
      this.item = data
    })
  }

  createReview(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {rating: 0, review: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.data = result;
      this.http.post(`${URL}/review/1`, this.data).subscribe(data =>{
        console.log(data)
        this.http.put(`${URL}/item/1`,{}).subscribe(data =>{
          console.log(data)
          this.get_data()
        })
      })
    });
  }








}

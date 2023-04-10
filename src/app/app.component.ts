import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Location } from '@angular/common';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {









  









  title = 'angularcrudapp';

  displayedColumns: string[] = ['productName', 'category', 'freshness', 'price','comment','date','action',];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


   constructor(private dialog:MatDialog, private api:ApiService, private location: Location){

   }
  
   
   ngOnInit():void{
    this.getAllProduts();
   
   }


   

   openDialog() {
     this.dialog.open(DialogComponent, {

      width:"40% ",
     });
  }

  getAllProduts(){

    this.api.getProduct().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort
      }, 
      error:()=>{
        alert("there is an error")

      }
    })
  }



  editproduct(row : any){
    this.dialog.open(DialogComponent,{
      width:"40% ",
      data:row
      
    })
    
  }



  deleteProduct(id:number){
    this.api.deletepro(id).subscribe({
      next:(res)=>{
        alert("producted deleted")
        
      }
      
    })
    //refresh the page 
    this.location.go(this.location.path());
    window.location.reload();


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

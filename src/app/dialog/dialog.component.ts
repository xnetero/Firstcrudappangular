import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormBuilder,Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  actionbtn:string='save';

  freshnessList=["Brand New", "Second Hand","refurbished"];
  productForm !:FormGroup;

  constructor(private formBuilder:FormBuilder, private api:ApiService,private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any){}

  ngOnInit(){
    this.productForm=this.formBuilder.group({

      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required],

    })

    if(this.editData){

      this.actionbtn='update'
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);

    }
  }

  addproduct(){



   if (!this.editData){
    if (this.productForm.valid){
      this.api.postProduct(this.productForm.value).subscribe({
        next:(res)=>{
          alert("product added succseufly");
          this.productForm.reset();
          this.dialogRef.close();

        
        },
        error:()=>{
          alert("there is an error")

        }
      })
    }
   }
   else{
    this.updateproduct()
   }
    
    //console.log(this.productForm.value)
   
  }


  updateproduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({

      next:(res)=>{alert("product updated succesfully"),
      this.productForm.reset();
      this.dialogRef.close();
    
    
    }
    
    }

    
      
    )

  }

}

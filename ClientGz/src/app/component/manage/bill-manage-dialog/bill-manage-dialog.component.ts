import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { MatDialogRef} from '@angular/material/dialog';
import { Inject, Optional } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Bill} from '../../../model/bill';

@Component({
  selector: 'app-bill-manage-dialog',
  templateUrl: './bill-manage-dialog.component.html',
  styleUrls: ['./bill-manage-dialog.component.css']
})
export class BillManageDialogComponent implements OnInit {

  local_data:any;

  constructor(public datapide : DatePipe,
    public dialogRef: MatDialogRef<BillManageDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Bill
  ) {
    //this.local_data = {...data};
    this.local_data = JSON.parse(JSON.stringify(data));
   }
   shipStt : boolean = false;
   receivedStt : boolean = false;
  ngOnInit(): void {
    this.checkStatus()
    console.log(this.local_data)

  }
  checkStatus(){
    if('0001-01-01T00:00:00' != this.local_data.billStatus.shippingDate){
      this.shipStt = true;
    }
    if('0001-01-01T00:00:00' != this.local_data.billStatus.received){
      this.receivedStt = true;
    }
  }
  ShippingConFirm(){
    this.local_data.billStatus.shippingDate = new Date()
    this.local_data.billStatus.status = 'shipping'
    this.checkStatus();
  }
  ReceiveConFirm(){
    this.local_data.billStatus.received = new Date()
    this.local_data.billStatus.status = 'received'
    if('0001-01-01T00:00:00' == this.local_data.billStatus.shippingDate){
      this.local_data.billStatus.shippingDate = new Date()
    }
    this.checkStatus();
  }
  save(){
    this.dialogRef.close(this.local_data);
  }

}

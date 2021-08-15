import { Component, OnInit } from '@angular/core';
import { Bill } from '../../../model/bill';
import { BillService } from '../../../service/bill.service';
import { BillManageDialogComponent } from '../bill-manage-dialog/bill-manage-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../../../service/account.service';
import { DatePipe } from '@angular/common';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
@Component({
  selector: 'app-bill-manage',
  templateUrl: './bill-manage.component.html',
  styleUrls: ['./bill-manage.component.css']
})
export class BillManageComponent implements OnInit {

  constructor(
    public datepipe: DatePipe,
    private router: Router,
    private billService: BillService,
    public dialog: MatDialog,
    private accountService: AccountService
  ) {
    this.showAdmin = this.accountService.checkAdmin();
    if (this.showAdmin != true) {
      this.router.navigateByUrl('home');
    }
  }

  showAdmin: boolean = false;

  ngOnInit(): void {
    console.log(this.showBy);
    this.getBill();
  }
  datePick : string
  showBy : string
  bills: Bill[] = [];
  allBills : Bill[] = []
  getBill(): void {
    this.billService.getBillManage()
      .subscribe(bills => {
        this.bills = bills;
        this.allBills = bills;
      });
  }
  openDialog(obj) {
    const dialogRef = this.dialog.open(BillManageDialogComponent, {
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        console.log("hello");
        this.updateBill(result);
      }
    })
  }
  showByStatus(){
    // const bills : Bill[] = []
    // var status = this.showBy;
    // this.allBills.forEach(function (element) {
    //   if(element.billStatus.status.includes(status)){
    //     bills.push(element)
    //   }
    // });
    // this.bills = bills

  }
  searchSttDate(){
    const bills : Bill[] = []
    if(!this.showBy && !this.datePick){
      this.bills = this.allBills;
    }else{

    if(this.showBy && !this.datePick){
      this.allBills.forEach((element) =>{
        if(element.billStatus.status.includes(this.showBy)){
          bills.push(element)
        }
      })
    }else if(!this.showBy){
    var value;
    this.allBills.forEach( (element) =>{
      value = this.datepipe.transform(element.orderDate,'yyyy-MM-dd');
      if(this.datePick == value){
        bills.push(element)
      }
    });
    }else{
      this.allBills.forEach( (element) =>{
        value = this.datepipe.transform(element.orderDate,'yyyy-MM-dd');
        if(this.datePick == value && element.billStatus.status.includes(this.showBy)){
          bills.push(element)
        }
      });

    }
    this.bills = bills;
  }

  }

  test(event: MatDatepickerInputEvent<Date>){
    this.datePick = this.datepipe.transform(event.value,'yyyy-MM-dd');
    this.searchSttDate();
  }
  findById(orderId : string){
   orderId =  orderId.replace(/[#"]+/g, '')
    const bills : Bill[] = []
    this.allBills.forEach(function (element) {
      if(element.id.toString().includes(orderId)){
        bills.push(element)
      }

    });
    this.bills = bills
  }
  updateBill(bill : Bill):void{
    this.billService.updateBill(bill.id, bill).subscribe();

    let i = 0;
    this.bills.forEach(function (item, index) {
      if (item.id == bill.id) {
        i = index;
      }
    })
    this.bills[i] = bill;
  }

}

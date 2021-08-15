import { Component, OnInit } from '@angular/core';
import { Bill } from '../../model/bill';
import { Inject, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AccountService } from 'src/app/service/account.service';
import { Account } from 'src/app/model/account';

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styleUrls: ['./bill-info.component.css']
})
export class BillInfoComponent implements OnInit {

  constructor(
    private accountService : AccountService,
    public dialogRef: MatDialogRef<BillInfoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Bill,
    private _formBuilder: FormBuilder
  ) {
    this.local_data = { ...data }
  }
  local_data: any;

  account : Account = {} as Account;

  ngOnInit(): void {
    this.accountService.getInfo().subscribe(info=>{
      this.local_data.name = info.nameReceiver;
      this.local_data.phone = info.phone;
      this.local_data.address = info.address;
    })

    this.NameFormGroup = this._formBuilder.group({
      NameCtrl: ['', Validators.required]
    });
    this.PhoneFormGroup = this._formBuilder.group({
      PhoneCtrl: ['', Validators.required]
    });
    this.AddressFormGroup = this._formBuilder.group({
      AddressCtrl: ['', Validators.required]
    });
  }

  order() {
    this.dialogRef.close({ data: this.local_data });
  }

  NameFormGroup: FormGroup;
  PhoneFormGroup: FormGroup;
  AddressFormGroup: FormGroup;
}

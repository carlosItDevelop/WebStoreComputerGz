import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/model/account'; 
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-logout',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private accountService:AccountService) { 
    this.getInfo();
  }


  logout()
  {
    localStorage.removeItem("JWT");
  }

  save()
  {
    this.accountService.updateInfo(this.account).subscribe();
  }


  ngOnInit(): void {
  }

  account: Account = {} as Account;
  getInfo(): void {
    this.accountService.getInfo()
      .subscribe(acc => {
        this.account = acc;
      });
  }
}

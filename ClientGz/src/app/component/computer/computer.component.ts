import { Component, OnInit } from '@angular/core';
import { Computer } from '../../model/computer';
import { ComputerService } from '../../service/computer.service';
import { MatDialog } from '@angular/material/dialog';
import { ComputerDialogComponent } from '../computer-dialog/computer-dialog.component'

import * as _ from 'lodash';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.css']
})
export class ComputerComponent implements OnInit {

  constructor(
    private computerService: ComputerService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getComputers();
  }

  computers: Computer[] = [];
  allCom: Computer[];
  getComputers(): void {
    this.computerService.getComputers()
      .subscribe(computers => {
        this.computers = computers;
        this.allCom = computers;
      });
  }
  search(name: string) {
    //this.getComputers();
    const comFind: Computer[] = [];
    this.allCom.forEach(function (item) {
      if (item.name.toUpperCase().includes(name.toUpperCase())) {
        comFind.push(item);
      }
    })

    this.computers = comFind;
  }

  getSort(sort: string) {
    if (sort == "incre") {
      this.computers = _.sortBy(this.computers, ['price']);
    }
    if (sort == "desc") {
      this.computers = _.sortBy(this.computers, ['price']).reverse();
    }
  }

  openDialog(obj) {
    this.dialog.open(ComputerDialogComponent, {
      data: obj
    });
  }

}

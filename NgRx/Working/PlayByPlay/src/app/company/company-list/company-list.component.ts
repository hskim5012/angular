import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies$: Observable<any>;

  constructor(private _companyService: CompanyService) { }

  ngOnInit() {
    this.getCompanies();
    console.log(this.companies$);
  }

  getCompanies(){
    this.companies$ = this._companyService.getCompanies();
  }

  // deleteCompany(companyId: number){
  //   this._companyService.deleteCompany(companyId).subscribe(() => this.getCompanies());
  // }

}

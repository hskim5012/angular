import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company';
import { Observable, pipe } from 'rxjs';
import { map, filter, catchError, mergeMap } from "rxjs/operators";

@Injectable()
export class CompanyService {
  API_BASE = "http://firebootcamp-crm-api.azurewebsites.net/api";

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get(`${this.API_BASE}/company`);
  }

  getCompany(companyId: number): Observable<Company> {
    return this.http.get<Company>(`${this.API_BASE}/company/${companyId}`);
  }

}

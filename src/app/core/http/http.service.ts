import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get('http://192.168.4.18:8084/stock?vDateStart=20221030&vDateEnd=20221102')
  }

}

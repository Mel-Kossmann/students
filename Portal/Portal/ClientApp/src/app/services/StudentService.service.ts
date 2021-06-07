import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class StudentService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /*setStudents(studentNr: any, firstname: any, surname: any, courseCode: any, courseDesc: any, grade: any) {*/
  setStudents(studentNr: any, firstname: any, surname: any,courseCode:any, courseDesc:any, grade:any) {
    /* let params = new HttpParams();
    params = params.append('studentNr', studentNr);
    params = params.append('firstname', firstname);
    params = params.append('surname', surname);
    params = params.append('courseCode', courseCode);
    params = params.append('courseDesc', courseDesc);
    params = params.append('grade', grade); */
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' }); //service pages
    return this.http.post(this.baseUrl + 'api/Student/upload?studentNr=' + studentNr + '&firstname=' + firstname + '&surname=' + surname + '&courseCode=' + courseCode + '&courseDesc=' + courseDesc + '&grade=' + grade, { headers: reqHeader });
    //{ params: params, headers: reqHeader}
  }
}

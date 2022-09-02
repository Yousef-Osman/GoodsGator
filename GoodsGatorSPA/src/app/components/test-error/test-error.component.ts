import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get400Error(){
    this.http.get(this.baseUrl + 'ErrorTesting/BadRequest').subscribe({
      next: res => console.log(res),
      error: e => console.log(e)
    });
  }

  get400ValidationError(){
    this.http.get(this.baseUrl + 'ErrorTesting/ValidationRequest?id=aaaa&num=hbdvh').subscribe({
      next: res => console.log(res),
      error: e => console.log(e)
    });
  }

  get404Error(){
    this.http.get(this.baseUrl + 'ErrorTesting/NotFound/5846').subscribe({
      next: res => console.log(res),
      error: e => console.log(e)
    });
  }

  get404NotFoundEndPointError(){
    this.http.get(this.baseUrl + 'ErrorTesting/NotFoundEndpoint').subscribe({
      next: res => console.log(res),
      error: e => console.log(e)
    });
  }

  get500Error(){
    this.http.get(this.baseUrl + 'ErrorTesting/InternalError').subscribe({
      next: res => console.log(res),
      error: e => console.log(e)
    });
  }

}

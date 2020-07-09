import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http :HttpClient) { }

  add(tarefa:any){

    let url = 'http://localhost:8000/api/task';

    var header = {
      headers: new HttpHeaders().set('Content-Type',`application/json`)
    }

    let param = {nome:tarefa.nome, status:tarefa.status};
    return this.http.post(url,param,header).toPromise();
  }

  list(){

    let url = 'http://localhost:8000/api/task';
    return this.http.get(url).toPromise();
  }

  update(tarefa:any){

    let url = `http://localhost:8000/api/task/${tarefa.id}`;

    var header = {
      headers: new HttpHeaders().set('Content-Type',`application/json`)
    }

    return this.http.post(url,tarefa).toPromise();
  }

  delete(tarefa:number){

    let url = `http://localhost:8000/api/deletetask/${tarefa}`;
    return this.http.get(url).toPromise();
  }

}

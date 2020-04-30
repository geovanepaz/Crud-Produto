import {HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export abstract class BaseService
{
    protected urlServiceV1: string = environment.urlServiceV1;

    protected obterHeaderJson(){
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          }
        return httpOptions;
    }
}
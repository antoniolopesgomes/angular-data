import 'rxjs/add/operator/map';
import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IAdapter} from './adapter.provider';
import {Configurator} from '../configurator';
import {Http, Headers, Response, Request, RequestOptionsArgs} from '@angular/http';

export interface IResourceResponse {
  headers: Headers;
  data: any;
}

@Injectable()
export class RestAdapter implements IAdapter {

  private _namespace: string;

  constructor(@Inject(Http) private _http: Http, @Inject(Configurator) private _config: Configurator) {
    this._buildNamespace();
  }

  private _buildNamespace(): void {
    this._namespace = this._config.getOption('app.endpoint');
  }

  private _buildEndpoint(path: string): string {
    return `${this.namespace}${path}`;
  }

  protected _toResponse(response: Response): IResourceResponse {
    return { headers: response.headers, data: response.json() };
  }
  /*protected _toErrorResponse(errorResponse: Response) {
     return Observable.throw({status: errorResponse.status, body: errorResponse.text()});
  }*/

  get namespace(): string {
    return this._namespace;
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {
      return this._http.request(this._buildEndpoint(<string>url), options).map(this._toResponse);
  }

  get(path: string, params: any): Observable<any> {
    return this._http.get(this._buildEndpoint(path)).map(this._toResponse);
  }

  post(path: string, params: any): Observable<any> {
    return this._http.post(this._buildEndpoint(path), params).map(this._toResponse);
  }
  put(path: string, params: any): Observable<any> {
    return this._http.put(this._buildEndpoint(path), params).map(this._toResponse);
  }
  delete(path: string, params: any): Observable<any> {
    return this._http.delete(this._buildEndpoint(path), params).map(this._toResponse);
  }
}

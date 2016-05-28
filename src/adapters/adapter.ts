import 'rxjs/add/operator/catch';
//import 'rxjs/observable/empty';
import {RequestOptionsArgs, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs';

export abstract class Adapter {
  getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');
    return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err, source) => {
      if (err.status == 401) {
        //this._router.navigate(['/login']);
        return Observable.empty();
      } else {
        return Observable.throw(err);
      }
    });

  }
}

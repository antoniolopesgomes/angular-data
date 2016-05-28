import {DATA_CONST} from '../constants';
import {RestAdapter} from './rest.adapter';
import {Configurator} from '../configurator';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Provider, ReflectiveInjector, Injectable, Inject} from '@angular/core';

export interface IAdapter {
  namespace: string;
  get(path: string, params?: any): Observable<any>;
  post(path: string, params?: any): Observable<any>;
  put(path: string, params?: any): Observable<any>;
  delete(path: string, params?: any): Observable<any>;
}

@Injectable()
export class AdapterProvider {
  /*private _configurator: Configurator;*/
  private _adapter: IAdapter;
  private _adapterClass: any;

  constructor(@Inject(Configurator) configService: Configurator) {
    /*this._configurator = configService;*/
    this._setAdaptor(configService);
  }

  private _setAdaptor(configService: Configurator): void {
    let name: string = configService.getOption(DATA_CONST.APP_ADAPTER, DATA_CONST.APP_DEFAULT_ADPATER);

    //let provider: Provider = this._buildClass(name.toLowerCase())
    let injector: ReflectiveInjector = this._buildInjector(name.toLowerCase(), configService);

    this._adapter = <IAdapter>injector.get(this._adapterClass);
  }

  private _buildClass(className: string): Provider {
    switch (className) {
      default:
          this._adapterClass = RestAdapter;
          return new Provider(RestAdapter, {useFactory: (http: Http, config: Configurator) => {
            return new RestAdapter(http, config);
          }, deps: [Http, Configurator]});
    }
  }

  private _buildInjector(adapter: string, configService: Configurator): ReflectiveInjector {
    return ReflectiveInjector.resolveAndCreate([
      HTTP_PROVIDERS,
      new Provider(Configurator, {useValue: configService}),
      this._buildClass(adapter)
    ]);
  }

  get adapter(): IAdapter {
    return this._adapter;
  }
}

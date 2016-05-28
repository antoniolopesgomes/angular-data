import {Provider} from '@angular/core';
import {Configurator} from '../configurator';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {RestAdapter} from '../adapters/rest.adapter';
import {AdapterProvider, IAdapter} from '../adapters/adapter.provider';


/**
 * Creates instance for having a driver from adapter
 * provider defined.
 *
 * @param {Configurator} configurator (Configurator dependency)
 * @returns {AdapterProvider}
 */
function factoryAdapterProvider(configurator: Configurator): AdapterProvider {
  return new AdapterProvider(configurator);
}

/**
 * Creates instance for RestAdapter
 *
 * @param {Http} http (Http dependency)
 * @param {Configurator} configurator (Configurator dependency)
 * @returns {RestAdapter}
 */
function factoryRestAdapter(http: Http, configurator: Configurator): RestAdapter {
  return new RestAdapter(http, configurator);
}

export const DATA_PROVIDERS: any[] = [
  HTTP_PROVIDERS,
  new Provider(Configurator, {useClass: Configurator}),
  new Provider(AdapterProvider, {deps:[Configurator], useFactory: factoryAdapterProvider}),
  new Provider(RestAdapter, {deps: [Http, Configurator], useFactory: factoryRestAdapter}),
];

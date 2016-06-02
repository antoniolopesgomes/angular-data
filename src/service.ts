import {Store} from './data/store';
import {Injectable} from '@angular/core';
import {InjectAdapter} from './annotations';
import * as Adapter from './adapters/adapter.provider';

/**
 * Class to extends as service which will
 * have adapter driver to comunicate and model
 * declared if service decorated to have model.
 *
 * @export
 * @class ServiceProvider
 */
@Injectable()
export class ServiceProvider {

  @InjectAdapter
  adapter: Adapter.IAdapter;
  store: Store;
}

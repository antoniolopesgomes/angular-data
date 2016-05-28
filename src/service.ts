import {Injectable} from '@angular/core';
import {Model, IModel} from './data/model';
import {InjectAdapter} from './annotations';
import {IAdapter} from './adapters/adapter.provider';

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
  adapter: IAdapter;
  model: Model<IModel>
}

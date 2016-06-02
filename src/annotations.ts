import {DATA_PROVIDERS} from './data/providers';
import {ReflectiveInjector} from '@angular/core';
import {AdapterProvider} from './adapters/adapter.provider';
import * as annotations from '@angular/core/src/util/decorators';
import {IResource} from './data/model';
import {Store} from './data/store';
import {Collection} from './data/collection';

/**
 * Provide a injector to search for common
 * data instances.
 *
 * @export
 * @returns {ReflectiveInjector} (description)
 */
export function dataInjector(): ReflectiveInjector {
  return ReflectiveInjector.resolveAndCreate(
    DATA_PROVIDERS
  );
}

/**
 * Adds adapter property to an object with the
 * instance of default or configured adapter to use
 * for data transactions.
 *
 * @param {*} target (description)
 * @param {string} key (description)
 * @returns {*} (description)
 */
function decorateAdapterProvide(target: any, key: string): any {
  let injector = dataInjector();
  let instance: AdapterProvider = injector.get(AdapterProvider);

  if (delete this[key]) {
    // Create new property with getter and setter
    Object.defineProperty(target, key, {
      value: instance.adapter,
      enumerable: true,
      configurable: true
    });
  }
}

export const InjectAdapter = annotations.makePropDecorator(decorateAdapterProvide);


/**
 * Data Store typing to construct the data
 * object.
 *
 * @class StoreConstructable
 */
class StoreConstructable {

  @InjectAdapter
  adapter: any;

  constructor(private _props: IStoreMetadata) {}

  register(): void {
    this._assignAdapter();
    this._assignCollection();
    this._assignProps();
  }

  private _assignAdapter(): void {
    Object.defineProperty(Store.prototype, 'adapter', {
      enumerable: true,
      value: this.adapter,
      configurable: false
    });
  }

  private _assignCollection(): void {
    Object.defineProperty(Store.prototype, 'collection', {
      enumerable: true,
      value: new Collection<IResource>(),
      writable: true
    });
  }

  private _assignProps(): void {
    Object.defineProperty(Store.prototype, 'props', {
      enumerable: true,
      value: this._props
    });
  }
}

export interface IStoreMetadata {
  model: Object | Function;
  belongsTo?: any;
}


/**
 * Decorates an object with a model property and
 * an instance of model declared on properties metadata.
 *
 * @export
 * @param {IModelMetadata} props (Properties metadata)
 * @returns (Function)
 */
export function InjectStore(props: IStoreMetadata): Function {
  let properties = props;

  if (!properties.hasOwnProperty('model')) {
    throw new Error('Declare the model class to inject on model property.');
  }

  return function decoratorFactory(target : Object|Function, decoratedPropertyName? : string) : any {
    let construtable = new StoreConstructable(props);
    construtable.register();

    Object.defineProperty((<any>target).prototype, 'store', {
      value: new Store(),
      enumerable: true,
      configurable: false
    });

    return target;
  }
}

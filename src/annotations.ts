import {DATA_PROVIDERS} from './data/providers';
import {ReflectiveInjector} from '@angular/core';
import {AdapterProvider} from './adapters/adapter.provider';
import {makePropDecorator, makeDecorator} from '@angular/core/src/util/decorators';
import {Model} from './data/model';


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

export const InjectAdapter = makePropDecorator(decorateAdapterProvide);


/**
 * Data Model typing to construct the data
 * object.
 *
 * @class ModelConstructable
 */
class ModelConstructable {

  model: any;
  @InjectAdapter
  adapter: any;

  constructor(private _props: any) {
    this.init();
  }

  init(): void {
    (<any>Model.prototype).adapter = this.adapter;
    Object.assign(this._props['model'].prototype, Model.prototype);

    this.model = new this._props['model']();
  }
}

export interface IModelMetadata {
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
export function InjectModel(props: IModelMetadata): Function {
  let properties = props;

  if (!properties.hasOwnProperty('model')) {
    throw new Error('Declare the model class to inject on model property.');
  }

  return function decoratorFactory(target : Object|Function, decoratedPropertyName? : string) : any {
    console.log('InjectModel: ', target, properties);

    let construtable = new ModelConstructable(props);

    Object.defineProperty((<any>target).prototype, 'model', {
      value: construtable.model,
      enumerable: true,
      configurable: false
    });

    return target;
  }
}

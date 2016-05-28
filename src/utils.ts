import {DATA_PROVIDERS} from './data/providers';
//import {Configurator} from './configurator';
import {makePropDecorator} from '@angular/core/src/util/decorators';
import {ReflectiveInjector} from '@angular/core';
import {AdapterProvider, IAdapter} from './adapters/adapter.provider';
export function isArguments(obj: any): boolean {
  return {}.toString.call(obj) === '[object Arguments]';
}

export function isArray(obj: any): boolean {
  return {}.toString.call(obj) === '[object Array]';
}

export function isBool(obj: any): boolean {
  return {}.toString.call(obj) === '[object Boolean]';
}

export function isFalsy(obj: any): boolean {
  return (isUndefined(obj) || isNull(obj) || isNaN(obj) ||
  obj === '' || obj === 0 || (isBool(obj) && Boolean(obj) === false));
}

export function isInfinite(obj: any): boolean {
  return obj === Infinity || obj === -Infinity;
}

export function isFunction(obj: any): boolean {
  return ({}.toString.call(obj) === '[object Function]');
}

export function isNaN(obj: any): boolean {
  return typeof obj === 'number' && obj !== obj;
}

export function isNull(obj: any): boolean {
  return {}.toString.call(obj) === '[object Null]';
}

export function isNumber(obj: any): boolean {
  return {}.toString.call(obj) === '[object Number]';
}

export function isObject(obj: any): boolean {
  return typeof obj === 'object';
}

export function isPlainObject(obj: any): boolean {
  return typeof obj === 'object' && {}.toString.call(obj) === '[object Object]';
}

export function isRegExp(obj: any): boolean {
  return {}.toString.call(obj) === '[object RegExp]' || obj instanceof RegExp;
}

export function isString(obj: any): boolean {
  return typeof obj === 'string' && {}.toString.call(obj) === '[object String]';
}

export function isUndefined(obj: any): boolean {
  return typeof obj === 'undefined';
}

export function capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Invoke a Constructor function with one or more arguments.
 *
 * @param {function} Class target class to instantiate
 * @param {Array.<*>} args one or more arguments to supply to the constructor.
 * @returns {object} an instance of the supplied Class.
 */
/*export function invokeConstructor<T>(Class : Constructable<T>, args : Array<any>) : T {
    // Good old pyramid of doom; found almost everywhere we need to invoke a constructor with
    // an unknown number of arguments.
    switch (args.length) {
        case 0: return new Class();
        case 1: return new Class(args[0]);
        case 2: return new Class(args[0], args[1]);
        case 3: return new Class(args[0], args[1], args[2]);
        case 4: return new Class(args[0], args[1], args[2], args[3]);
        case 5: return new Class(args[0], args[1], args[2], args[3], args[4]);
        case 6: return new Class(args[0], args[1], args[2], args[3], args[4], args[5]);
        case 7: return new Class(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        case 8: return new Class(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
        case 9: return new Class(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
        case 10: return new Class(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);

        default:
            throw new Error('Unsupported number of Constructor arguments');
    }
}*/

/**
 * Identifies an object which we can call `new` on.
 */
/*export interface Constructable<T> {
    new(...args: any[]) : T;
}*/

/**
 * Used to identify InjectPoint's which target an instances Constructor.
 *
 * @type {string}
 */
/*export const CONSTRUCTOR_PROPERTY_NAME = 'constructor';

export function InjectDependency(resources: any[]): Function {
  return function depInject(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>): any {
    if (descriptor === undefined || !isObject(descriptor)) {
      let property = Object.getOwnPropertyDescriptor(target, key);
      descriptor = isUndefined(property)
                    ? <TypedPropertyDescriptor<any>>{ enumerable: true, value: function() {}}
                    : property;
    }

    let originalMethod: any = descriptor.value;
    //editing the descriptor/value parameter
    //Object.assign(target, settings);
    descriptor.value = function() {
      let injector = ReflectiveInjector.resolveAndCreate(resources);
      //var car = injector.get(Car);
      //Object.assign((<any>this).metadata, injector);
      Object.defineProperty((<any>this), key, {
        enumerable: true,
        value: injector
      });

      originalMethod.apply(this, []);
    }

    return descriptor;
  }
}*/

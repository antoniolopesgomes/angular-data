import {isObject} from './util';

export interface IOptions {
  [key: string]: any;
}

export class Configurator {
  private _repository: IOptions;

  constructor() {
    this._readGlobalConfig();
  }

  private _readGlobalConfig(): void {
    if ((<any>window).hasOwnProperty('__ENV')) {
       this._flat((<any>window).__ENV);
    }
  }

  private _flat(config: any, key: string = '') {
    let path: string =+ (key === '') ? key : key+'.';

    Object.keys(config).forEach((key: string) => {
      if (isObject(config[key])) {
        this._flat(config[key], path+key);
      } else {
        this.setOption(`${path+key}`, config[key]);
      }
    });
  }

  setOption(name: string, value: any): void {
    this._repository[name] = value;
  }

  getOption(name: string, defaults: any = null): any {
    return this.hasOption(name) ? this._repository[name] : defaults;
  }

  hasOption(name: string): boolean {
    return this._repository.hasOwnProperty(name);
  }
}

import {IResource, Model} from './model';
import {Collection} from './collection';
import {IStoreMetadata} from '../annotations';
import {mix} from '../utils';
import {Observable} from 'rxjs/Observable';

export class Store {
  //All Setted by injector
  props: IStoreMetadata;
  collection: Collection<IResource>;
  adapter: any;

  factoryModel(factoryModel?: any, resourceModel?: IResource): any {
    let modelFactory = factoryModel ? factoryModel : Model;
    let modelResource = resourceModel ? resourceModel : (<any>this).props.model;

    Object.setPrototypeOf(modelResource.prototype, modelFactory.prototype);

    Object.defineProperty(modelResource.prototype, 'adapter', {
      enumerable: true,
      value: this.adapter
    });

    // Instance without properties
    //console.dir(Object.create(modelResource.prototype));
    return modelResource;
  }

  createCollection(resources: Array<IResource>, modelDefaultClass?: any, modelInstanceClass?: IResource): IResource[] {
    let model = this.factoryModel(modelDefaultClass, modelInstanceClass);

    resources.forEach((resource: IResource) => {
      let row = this._buildRow(resource, new model());
      this.collection.add(row);
    });

    console.log('Create Collection Type', this);
    return this.collection.all()
  }

  private _buildRow(resource: IResource, modelInstance: any): any {
    Object.keys(modelInstance).forEach((key: string) => {
      if (resource.hasOwnProperty(key)) {
        modelInstance[key] = resource[key];
      }
    });

    return modelInstance;
  }
}

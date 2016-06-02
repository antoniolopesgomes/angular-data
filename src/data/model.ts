import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export interface IResource {
  [key: string]: any;
}

/*@Injectable()
export class Model<Resource> {
  schema: IModel;
  collection: Array<IModel>;

  addResource(resources: Array<IModel>) {
    resources.map((resource: IModel) => {
      let target = Object.assign({}, this.schema);

      Object.keys(this.schema).forEach((key: string) => {

        target[key] = resource[key];
      });

      //TODO: Convert this to a typed object (Record, Resource) and BehaviorSubject or Subject
      // observable
      this.collection.push(Object.assign(Object.create(<IModel>{}), target) );
    });

    return new BehaviorSubject(this.collection);
  }
}*/
@Injectable()
export class Model<IResource> {
  toJSON(): any {
    return JSON.parse(JSON.stringify(Object.keys(this)));
  }
}

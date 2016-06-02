import 'rxjs/add/observable/from';
import {IResource} from './model';
import {Observable} from 'rxjs/Observable';

export class Collection<TModel> {
  private _repository: Array<TModel> = [];

  add(model: TModel): void {
    this._repository.push(model);
  }

  all(): Array<TModel> {
    return this._repository;
  }

  getByIndex(position: number): any {
    return this._repository[position];
  }

  //TODO: A data state abstract class
  observe(): Observable<TModel> {
    return Observable.from(this._repository);
  }
}

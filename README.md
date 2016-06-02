Angular 2 Data (In Progress)
==================

[![Author](https://img.shields.io/badge/author-miguelramos-blue.svg)](https://twitter.com/miguelonspring)

Angular 2 data models.

## Installation

    git clone https://github.com/miguelramos/angular-data
    cd angular-data
    npm i

## Compile

    npm run compile

## Usage (Developer Preview Mode)

    git clone git@github.com:mgechev/angular2-seed.git
    cd angular2-seed
    mkdir src/client/config
    npm i
    cd node_modules/@angular
    ln -s ../../angular-data data
    
Create a options.ts file on src/client/config and insert content bellow.

### Options.ts

	(<any>window).__ENV = {
	  'app.env': 'dev',
	  'app.endpoint': 'http://jsonplaceholder.typicode.com',
	  'app.adapter': 'REST'
	};
	
On index.html page add options script to header	
	
### Index.html	

	<script src="/config/options.js"></script>
	
On main.ts add data providers.

### Main.ts

    import { APP_BASE_HREF } from '@angular/common';
    import {enableDebugTools} from '@angular/platform-browser';
    import { enableProdMode, provide, ComponentRef } from '@angular/core';
    import { bootstrap } from '@angular/platform-browser-dynamic';
    import { ROUTER_PROVIDERS } from '@angular/router';
    import {DATA_PROVIDERS} from '@angular/data';

    import { AppComponent } from './app.component';

    if ('<%= ENV %>' === 'prod') { enableProdMode(); }

    bootstrap(AppComponent, [
      ROUTER_PROVIDERS,
      DATA_PROVIDERS,
      provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' })
    ]);
    
Create user.model.ts in src/client/app/+home and add content bellow.

### User.model.ts

	import {Injectable} from '@angular/core';
	
	@Injectable()
	export class User {
	  address: {} = {};
	  company: {} = {};
	  username: string = null;
	  name: string = null;
	  email: string = null;
	  website: string = null;
	
	  get nameEmail(): string {
	    return `${this.name} <${this.email}>`;
	  }
	}
	
Create home.service ts file in src/client/app/+home and add content bellow.

### Home.service.ts

	import {Injectable} from '@angular/core';
	import {InjectStore} from '@angular/data';
	import {ServiceProvider} from '@angular/data';
	import {User} from './user.model';
	
	@Injectable()
	@InjectStore({
	  model: User
	})
	export class HomeService extends ServiceProvider {
	  constructor() {
	    super();
	  }
	  all(params?: any) {
	    return this.adapter.get('/users', params).map((user: any) => {
	      //TODO: Integrate data as key => value on model.
	      return this.store.createCollection(user.data);
	    });
	  }
	}
	
On home.component.ts change to the following code:

### Home.component.ts

	import { FORM_DIRECTIVES } from '@angular/common';
	import { Component, OnInit } from '@angular/core';
	import {User} from './user.model';
	import {HomeService} from './home.service';
	import { NameListService } from '../shared/index';
	
	@Component({
	  selector: 'sd-home',
	  templateUrl: 'app/+home/home.component.html',
	  styleUrls: ['app/+home/home.component.css'],
	  directives: [FORM_DIRECTIVES],
	  providers: [HomeService]
	})
	export class HomeComponent implements OnInit {
	  newName: string;
	  constructor(public nameListService: NameListService, private _service: HomeService) {}
	
	  ngOnInit() {
	    this._service.all().subscribe((users: User[])=> {
	      users.map((user: User) => {
	        this.nameListService.add(user.nameEmail);
	      });
	    });
	  }
	  /*
	   * @param newname  any text as input.
	   * @returns return false to prevent default form submit behavior to refresh the page.
	   */
	  addName(): boolean {
	    //this._store.queryModel(UserModel);
	    this.nameListService.add(this.newName);
	    this.newName = '';
	    return false;
	  }
	}
    

Run angular2-seed check new names on home page and check console on browser to see store object.

## API (In Progress)

@InjectStore - Add store instance to the service (to be described)
@InjectAdapter - Add adapter comunication instance (to be described)

## Tests

    npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 1.0.0 Project creation

## Node Compatibility

* v6.2.0
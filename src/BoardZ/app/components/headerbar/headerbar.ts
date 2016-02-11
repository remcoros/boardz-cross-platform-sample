import {Component, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Router} from 'angular2/router';

import {Breadcrumb} from '../breadcrumb/breadcrumb';
import {Logger} from '../../services/logging/logger';
import {TokenDataStore} from '../../services/login/tokenDataStore';
import {UserMenu} from './usermenu';

@Component({
    selector: 'headerbar',
    directives: [NgClass, Breadcrumb, UserMenu],
    templateUrl: 'app/components/headerbar/headerbar.html'
})
export class Headerbar {
    @Input()
    public showAppname: boolean;

    public currentLocation: string = 'BoardZ!';
    public showUser: boolean = true;
    public useremenuOpen: boolean = false;
    public settingsmenuOpen: boolean = false;
    public notificationsOpen: boolean = false;

    constructor(public tokenStore: TokenDataStore, private _router: Router, private _logger: Logger) {
        while (this._router.parent) {
            this._router = this._router.parent;
        }

        this._router.subscribe(routeUrl => {
            this._logger.logVerbose('Headerbar detected routing to: ' + routeUrl);

            this._router.recognize(routeUrl).then(instruction => {
                while (instruction.child) {
                    instruction = instruction.child;
                }

                this.currentLocation = instruction.component.routeData.get('displayName');
            });
        });
    }
}
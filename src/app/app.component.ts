import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'oauthTest';

    constructor(
        private activatedRoute: ActivatedRoute,
        private httpClient: HttpClient,
        private router: Router
    ) { }

    navigateHome() {
        this.router.navigateByUrl("/home")
    }

    navigateLogin() {
        this.router.navigateByUrl("/login")
    }

    navigateConnected() {
        this.router.navigateByUrl("/connected")
    }
}

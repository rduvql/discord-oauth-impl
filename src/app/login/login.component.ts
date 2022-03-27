import { Component, OnInit } from '@angular/core';

import * as queryString from 'query-string'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    discordLogginLink() {
        return queryString.stringifyUrl(
            {
                url: 'https://discordapp.com/api/oauth2/authorize',
                query: {
                    client_id: "",
                    redirect_uri: `http://localhost:4200/authorize`,
                    response_type: 'code',
                    scope: 'identify email',
                    state: JSON.stringify({
                        provider: "discord",
                    }),
                },
            },
            { encode: false },
        )
    }

}

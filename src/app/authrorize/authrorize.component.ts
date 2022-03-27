import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';

@Component({
    selector: 'app-authrorize',
    templateUrl: './authrorize.component.html',
    styleUrls: ['./authrorize.component.scss']
})
export class AuthrorizeComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private httpClient: HttpClient,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.activatedRoute.queryParamMap.pipe(
            filter(params => params.has("code")),
            switchMap(queryParams => {
                return this.httpClient.get<{ jwt: string }>("/api/login", { params: { code: queryParams.get("code") } })
            })
        ).subscribe(resp => {

            console.log("received token from login: ", resp.jwt)
            localStorage.setItem("jwt_token", resp.jwt)
            
            this.router.navigateByUrl("/connected")
        })
    }

}


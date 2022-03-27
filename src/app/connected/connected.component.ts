import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-connected',
    templateUrl: './connected.component.html',
    styleUrls: ['./connected.component.scss']
})
export class ConnectedComponent implements OnInit {

    userInfo: any;
    
    constructor(
        private httpClient: HttpClient
    ) { }

    ngOnInit(): void {

        this.httpClient.get<any>("/api/info").subscribe(v => {
            this.userInfo = v
        })
    }

}

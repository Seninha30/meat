import { User } from './user.model';
import { MEAT_API } from './../../app.api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { tap, filter} from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class LoginService {

    user: User;
    lastUrl: string;

    constructor(private http: HttpClient,
        private route: Router) {
        this.route.events.pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => this.lastUrl = e.url)/*pega a ultima url acessada*/
    }

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${MEAT_API}/login`, { email: email, password: password })
        .pipe(tap(x => this.user = x));
    }

    logout() {
        this.user = undefined;
    }

    isLoggegIn(): boolean {
        return this.user !== undefined;
    }


    handleLogin(path: string =  this.lastUrl) {
        this.route.navigate(['/login', btoa(path)]);
    }
}
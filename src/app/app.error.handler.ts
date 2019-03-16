import { LoginService } from './security/login/login.service';
import { NotificationService } from 'app/shared/messages/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';

@Injectable()
export class AplicationErrorHandler extends ErrorHandler {
    constructor(private ns: NotificationService,
        private injector: Injector,
        private zone: NgZone) {
        super();
    }
    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            this.zone.run(() => {
                const message = errorResponse.error.message;
                switch (errorResponse.status) {
                    case 401:
                        this.injector.get(LoginService).handleLogin();
                        break;
                    case 403:
                        this.ns.notify(message || 'Não autorizado');
                        break;
                    case 404:
                        this.ns.notify(message || 'Recurso não encontrado');
                        break;
                    default:
                        break;
                }
            })
        }
        super.handleError(errorResponse)
    }
}

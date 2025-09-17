import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private loadingService: LoadingService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        let shouldShowLoading = true;

        // ----- Handle query param: ?loadingState=false -----
        const loadingStateParam = request.params.get('loadingState');
        if (loadingStateParam && ['false', '0', 'no'].includes(loadingStateParam.toLowerCase())) {
            shouldShowLoading = false;
        }

        // ----- Handle body: { loadingState: false } -----
        if (
            request.body &&
            typeof request.body === 'object' &&
            !(request.body instanceof FormData)
        ) {
            const body = request.body as any;

            if (typeof body.loadingState !== 'undefined') {
                shouldShowLoading = !!body.loadingState;

                // Remove `loadingState` from body before sending to server
                const { loadingState, ...cleanedBody } = body;
                request = request.clone({ body: cleanedBody });
            }
        }

        // ----- If loadingState is disabled, skip loading service -----
        if (!shouldShowLoading) {
            return next.handle(request);
        }

        // ----- Show loading -----
        this.loadingService.show();

        return next.handle(request).pipe(
            finalize(() => {
                this.loadingService.hide();
            })
        );
    }
}

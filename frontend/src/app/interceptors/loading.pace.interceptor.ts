import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingPaceInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const body: any = request.body;
        let loadingState: boolean = (body !== null && typeof body.loadingState !== 'undefined')
            ? body.loadingState : true;
        loadingState = request.params.get('loadingState') === 'false' ? false : loadingState;
        if (!loadingState) {
            return next.handle(request);
        }
        // Bắt đầu loading
        Pace.restart();

        return next.handle(request).pipe(
            finalize(() => {
                // Kết thúc loading
                Pace.stop();
            })
        );
    }
}

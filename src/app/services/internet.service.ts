import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export class Intercept implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (!window.navigator.onLine) {
        // if there is no internet, throw a HttpErrorResponse error
        // since an error is thrown, the function will terminate here
        const error = {
          status: 0,
          error: {
            description: 'Check Connectivity!'
          },
          statusText: 'Check Connectivity!'
        };
        return throwError(new HttpErrorResponse(error));
      } else {
        // else return the normal request
        return next.handle(req);
      }
   }
  }
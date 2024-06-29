import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function TokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('token');
  if (token && !req.url.includes('/auth/')) {
    const modifiedRequest = req.clone({
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
    return next(modifiedRequest);
  }
  return next(req);
}

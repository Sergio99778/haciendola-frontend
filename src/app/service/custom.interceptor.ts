import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const myToken = localStorage.getItem(
    environment.auth_token_local_storage_key
  );

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${myToken}`,
    },
  });
  return next(cloneRequest);
};

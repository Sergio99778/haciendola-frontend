import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const localData = localStorage.getItem(
    environment.auth_token_local_storage_key
  );

  if (localData != null) {
    try {
      const decodedToken = jwtDecode(localData);
      const currentTime = Date.now().valueOf() / 1000;

      if (decodedToken.exp !== undefined && decodedToken.exp < currentTime) {
        console.log('Token expirado');
        router.navigateByUrl('/login');
        return false;
      }

      return true;
    } catch (err) {
      console.log('Token inválido');
      router.navigateByUrl('/login');
      return false;
    }
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const localData = localStorage.getItem(
    environment.auth_token_local_storage_key
  );
  if (localData != null) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};

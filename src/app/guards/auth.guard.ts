import { CanActivateFn, GuardResult, MaybeAsync } from '@angular/router';
import { Injectable } from '@angular/core';
import { DbserviceService } from '../service/dbservice.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private dbservice: DbserviceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.dbservice.getUsuarioActivo().pipe(
      take(1),
      map(usuario => {
        
        const isAuth = !!usuario;

          if (isAuth) {
            return true;
          } else {
            return this.router.createUrlTree(['/login']);
          }
  })
  )}
}

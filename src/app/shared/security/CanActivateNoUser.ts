import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/core/services/user.service";

@Injectable({providedIn: 'root',})
export class CanActivateNoUser implements CanActivate {
  constructor(private userService:UserService, private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    const user = this.userService.getUserValue()
    const permiso = user === null
    if (!permiso) this.router.navigate(['/dashboard'])
    return permiso
  }
}
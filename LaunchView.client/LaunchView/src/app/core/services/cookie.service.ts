import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  setCookie(name : string, value: any, exminutes: number | null ) {
    if (exminutes === null) return;
    const d = new Date();
    d.setTime(d.getTime() + (exminutes * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  
  getCookie(name: string) {
    name += "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  deleteCookie(name: string) {
    this.setCookie(name, "", -1);
  }
}

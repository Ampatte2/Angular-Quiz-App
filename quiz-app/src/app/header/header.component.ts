import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed: boolean=true;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  isLogged(){
    return this.authService.isLoggedIn();
  }
  logOut(){
    return this.authService.logout();
  }


}

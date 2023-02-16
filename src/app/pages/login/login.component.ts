import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.verificarTokenUrlCallback();
  }

  verificarTokenUrlCallback() {
    const token =  this.spotifyService.obterTokenUrlCallback();
    if(!!token) {
      this.spotifyService.definirAccessToken(token);
    }
  }

  abrirPaginaLogin() {
    window.location.href =this.spotifyService.obterUrlLogin()
  }

}

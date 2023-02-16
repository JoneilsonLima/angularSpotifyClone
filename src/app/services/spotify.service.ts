import { IUsuario } from './../interfaces/IUsuario';
import { SpotifyConfiguration } from './../../environments/environment';
import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js'
import { SpotifyUserParaUsuario } from '../Common/spotifyHelper';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs;
  usuario!: IUsuario;

  constructor() {
    this.spotifyApi = new Spotify();
   }

   async inicializarUsuario() {
    if(!!this.usuario) {
      return true
    }

    const token = localStorage.getItem('token');

    if(!token) {
      return false;
    }

    try {

      this.definirAccessToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;

    }catch(ex) {
      return false;
    }
   }

   async obterSpotifyUsuario() {
    const userInfo = this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(await userInfo);
   }

  obterUrlLogin() {
    const authEndPoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndPoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback() {
    if(!window.location.hash) {
      return '';
    }

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];

    return '';
  }

  definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }
}

import { ToastController, LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public loading: HTMLIonLoadingElement;

  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController) { }

  async message(message:string, color:string = 'success', duration:number = 2000){
    
    const toast = await this.toastCtrl.create({
      message:message,
      duration:duration,
      position:'middle',//top(topo),middle(meio)
      color:color
    });

    toast.present();
  }

  async showLoading(message:string = 'Processando'){
    
    let loading = await this.loadingCtrl.create({message});
    this.loading = loading;
    this.loading.present();
  }

  async hideLoading(){
    if(this.loading != undefined && this.loading != null){
      this.loading.dismiss();
    }
  }



}

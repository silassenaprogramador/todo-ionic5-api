import { UtilService } from './../services/util.service';
import { TodoService } from './../services/todo.service';
import { Component } from '@angular/core';
import { AlertController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  list_task : any[] = [];

  constructor(
              private alertCtrl: AlertController,
              private actionSheetCtrl: ActionSheetController,
              private todoService: TodoService,
              private utilService: UtilService
            ) {

              this.listTaskDB();
            }

  async showAdd(){

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'O que deseja fazer ?',
      inputs: [
        {
          name: 'taskName',
          type: 'text',
          placeholder: 'Digite uma terefa'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (form) => {
            console.log('Confirm Ok');
            this.add(form.taskName)
          }
        }
      ]
    }); 

    await alert.present();
  }

  async add(nome_task:string){
    
    if(nome_task.trim().length < 1){
      this.utilService.message('Nome da tarefa nao pode ser vazio','danger');
      return;
    }

    let task = {nome:nome_task,status:false};

    this.todoService.add(task)
    .then( async (response)=>{
      this.utilService.message('Operacao realizada com sucesso!');
      this.listTaskDB();
    }).
    catch( async (response)=>{
      this.utilService.message('Operacao falhou','danger');
    }); 
  }

  listTaskDB(){

    this.utilService.showLoading();

    this.todoService.list()
      .then((response:any[])=>{
        this.utilService.hideLoading();
        this.list_task = response;       
      })
      .catch((response)=>{
        this.utilService.hideLoading();
      });
  }

  async openActions(task){

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O que deseja fazer ?',
      buttons: [{
        text: task.status == 1 ? 'Desmarcar':'Marcar',
        icon: task.status == 1 ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {
          task.status = task.status == 1 ? 0 : 1;
          this.updateTaskDB(task);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  updateTaskDB(task){
    this.todoService.update(task)
      .then( async (response)=>{
        this.utilService.message('Operacao realizada com sucesso!');
      })
      .catch(async(response)=>{
        this.utilService.message('Operacao falhou!','danger');
      });
  }

  delete(task:any){
    this.todoService.delete(task.id)
    .then( async (response)=>{
      this.utilService.message('Operacao realizada com sucesso!');
      this.listTaskDB();
    })
    .catch(async(response)=>{
      this.utilService.message('Operacao falhou!','danger');
    });
  }

}

import { Component } from '@angular/core';
import { NavController, Toggle, AlertController } from 'ionic-angular';
import { User } from '../../models/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username: string;
  usernameConfirmation: string;
  password: string;
  fullName: string;
  mobilePhone: string;
  livesPlace: string;
  profilePicture: string;

  checkbox: boolean;
  

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController) {

  }

  ionViewWillEnter() {
   
   let input = document.getElementById('livesplace').getElementsByTagName('input')[0];
   let autocomplete = new google.maps.places.Autocomplete(input, {types: ['geocode']});
   google.maps.event.addListener(autocomplete, 'place_changed', () => {
     let place = autocomplete.getPlace();
     this.livesPlace = place.address_components[0].long_name;
   });
}

onToggle(toggle: Toggle){
  this.checkbox = toggle.checked;
}

  onConfirm(){
    if(this.checkbox){
    let user = new User(this.username, this.usernameConfirmation,
                        this.password, this.fullName, this.mobilePhone,
                        this.livesPlace, this.profilePicture);

    console.log(JSON.stringify(user));
  }else{
    let alert = this.alertCtrl.create({
      title: "Erro",
      subTitle:'Para continuar você deve aceitar os termos e condições.',
      buttons:['Ok']
    });
    alert.present();
  }
  }



   

}

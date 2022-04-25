import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/services/web.service';
import { AdMob, AdOptions, AdLoadInfo, InterstitialAdPluginEvents, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from 'src/environments/environment.prod';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  
  constructor(public webApi: WebService, private iab: InAppBrowser, public alertController: AlertController, private platform: Platform, public actionSheetController: ActionSheetController) { }

  games: any;  
  homeData = [];
  subscription: any;
  env:any;


  // Android AD Options
  intOptions: AdOptions = {
    adId: environment.interstitial_ad_id,
    isTesting: environment.testing_ad
  };

  
  bannerOptions: BannerAdOptions = {
    adId: environment.banner_ad_id,
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting: environment.testing_ad
  };

  //iOS AD Options

  iosIntOptions: AdOptions = {
    adId: environment.ios_interstitial_ad_id,
    isTesting: environment.testing_ad
  };

  
  iosBannerOptions: BannerAdOptions = {
    adId: environment.ios_banner_ad_id,
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting: environment.testing_ad
  };


  ngOnInit() {
    this.env = environment;
    this.prepareData();
    this.initAdmob();
   
  }


  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribeWithPriority(9999,() => {
        this.exit();
    });
}

ionViewWillLeave() {
  this.subscription.unsubscribe();
}

async exit() {
  const alert = await this.alertController.create({
    header: 'Do you want to exit?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Action cancelled');
        }
      }, {
        text: 'Yes!',
        handler: () => {
          navigator['app'].exitApp();
        }
      }
    ]
  });

  await alert.present();
}


  doRefresh(event) {
    this.prepareData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);

  }


  prepareData() {
    if (!localStorage.getItem("games")) {
      this.getData();
    } else {
      this.games = JSON.parse(localStorage.getItem("games"));
      this.getData();
    }
    this.makeHomeData();
  }

  getData(){
    this.webApi.getData().subscribe(data => {
      if (data[0].status == "success") {
        localStorage.setItem("games", JSON.stringify(data[0].data[0]));
        this.games = data[0].data[0];
      }
    });
  }

  
  async initAdmob() {
    await AdMob.initialize({});
    this.showBannerAds();
  }


  openGame(gameUri) {
    this.prepareAd();
    const browser = this.iab.create(gameUri, '_blank', 'location=no,mediaPlaybackRequiresUserAction=yes');
    browser.on('exit').subscribe(e => {
      this.showInterstitialAd();
    });
    browser.on('loaderror').subscribe(e => {
      this.prepareAd();
      browser.close();
      this.showInterstitialAd();
    });

    browser.on('loadstop').subscribe(e => {
      this.prepareAd();

      browser.executeScript({"code":"var scripts=document.getElementsByTagName('script');console.log(scripts.length);for(var totalScripts=scripts.length,i=0;i<totalScripts;i++)scripts[i]?(scripts[i].remove(),console.log(i,' is removed')):console.log(i,' is skipped');"});
      browser.executeScript({"code":"var scripts=document.getElementsByTagName('script');console.log(scripts.length);for(var totalScripts=scripts.length,i=0;i<totalScripts;i++)scripts[i]?(scripts[i].remove(),console.log(i,' is removed')):console.log(i,' is skipped');"});
      browser.executeScript({"code":"var scripts=document.getElementsByTagName('script');console.log(scripts.length);for(var totalScripts=scripts.length,i=0;i<totalScripts;i++)scripts[i]?(scripts[i].remove(),console.log(i,' is removed')):console.log(i,' is skipped');"});
      browser.executeScript({"code":"var scripts=document.getElementsByTagName('script');console.log(scripts.length);for(var totalScripts=scripts.length,i=0;i<totalScripts;i++)scripts[i]?(scripts[i].remove(),console.log(i,' is removed')):console.log(i,' is skipped');"});
      
      this.showInterstitialAd();
    });

  }

  async showBannerAds(){

    if(Capacitor.getPlatform() == "android"){
      AdMob.showBanner(this.bannerOptions);
    }

    if(Capacitor.getPlatform() == "ios"){
    AdMob.showBanner(this.iosBannerOptions);
    }
  }
  
  async showInterstitialAd() {

    // AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: AdLoadInfo) => {
    //   // console.log(info);
    //   // Subscribe prepared interstitial
    // });

    await AdMob.showInterstitial().then(
      value => {
        // console.log(value)
      },
      error => {
        // console.log(error); // show error for debuging if ad is not showing
      }
    );

  }


  async prepareAd(){

    if(Capacitor.getPlatform() == "android"){
      await AdMob.prepareInterstitial(this.intOptions).then(
        value => {
          // console.log(value)
        },
        error => {
          // console.log(error); // show error for debuging if ad is not showing
        }
      );
    }


    if(Capacitor.getPlatform() == "ios"){
      await AdMob.prepareInterstitial(this.iosIntOptions).then(
        value => {
          // console.log(value)
        },
        error => {
          // console.log(error); // show error for debuging if ad is not showing
        }
      );
    }


 
  }




  makeHomeData() {
    console.log(this.games);
    
    if(this.games != undefined){
      this.homeData = [];
      for (let i = 0; i < this.games.categories.length; i++) {
        this.homeData[i] = [];
        for (let j = 0; j < this.games.games.length; j++) {
          if (this.games.categories[i].id == this.games.games[j].category_id && this.homeData[i].length < 4) {
            this.homeData[i].push(this.games.games[j]);
          }
        }
      }
    }
    

    if (this.games == undefined) {
      setTimeout(() => {
        this.prepareData();
      }, 2500);
    }
  
  }

  


}

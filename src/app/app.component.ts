import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { TranslateConfigService } from "./services/translate-config.service";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { WebService } from "./services/web.service";
import { Network } from '@capacitor/network';
import { Toast } from '@capacitor/toast';


@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    public webApi: WebService,
    private translateConfigService: TranslateConfigService
  ) {
    this.initializeApp();
  }

  systemLanguage: any;
  initializeApp() {
    this.platform.ready().then(() => {
      SplashScreen.hide();
      this.updateAppLanguage();
      this.setStatusBar();
      this.updateDatabase();
      this.checkConnection();
    });
  }

  setStatusBar() {
    if (Capacitor.getPlatform() !== 'web') {
      const setStatusBarStyleLight = async () => {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: "#fafafa" });
      };
      setStatusBarStyleLight();
    }
  }

  async checkConnection() {
    Network.addListener('networkStatusChange', status => {
      console.log('Network status ', status);
      if (!status.connected) {
         Toast.show({
          text: 'Internet Connection Lost!',
        });
      }
    });
    let status = await Network.getStatus();
    if (!status.connected) {
      await Toast.show({
        text: 'Internet Connection Lost!',
      });
    }

  }

  updateDatabase() {
    this.webApi.getData().subscribe(data => {
      if (data[0].status == "success") {
        localStorage.setItem("games", JSON.stringify(data[0].data[0]));
      }
    });
  }

  updateAppLanguage() {
    if (!localStorage.getItem("appLanguage")) {
      localStorage.setItem("appLanguage", "en");
      this.systemLanguage = "en";
    } else {
      this.systemLanguage = localStorage.getItem("appLanguage");
    }
    this.translateConfigService.setLanguage(this.systemLanguage);
  }

}

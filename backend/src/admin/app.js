import Logo from "./extensions/logo.png";
import Favicon from "./extensions/favicon.ico";

export default {
  config: {
    head: {
      favicon: Favicon,
    },
    auth: {
      logo: Logo,
    },
    menu: {
      logo: Logo,
    },
    locales: ["ko"],
    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "Admin Dashboard",
        "app.components.LeftMenu.navbrand.workplace": "NYKEA Website",
        "Auth.form.welcome.title": "Admin Dashboard",
        "Auth.form.welcome.subtitle": "Log in to your NYKEA Admin account",
      },
    },
  },
};

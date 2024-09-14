# Sons of Vancouver Distillery - Spirits Calculator

This repository contains all necessary code and details for building the Sons of Vancouver Spirits Calculator. This app is primarly a SPA (Single Page Appliation) setup as a PWA (Progressive Web App). The app is written primarally in JS & TS utilizing `vite`, `react`, `tailwind`, and `shacdn-ui`. `Cordova` is used for bundling this application as a native application for various platforms, currently android, but in the future potentially as an iOS, or PC/Mac electron app.. 

## Repository File Structure
- `./`	
  *Description:* The project root contains all the necessary configuration, and supporting files for the application. 
- `./cordova`  
  *Description:* The cordova directory is where the cordova related configuration resides.
  All cordova cli commands must be run from this directory.  

  - `./cordova/res`  
    *Description:* All native application resources: icons, splashscreen, and images

  - `./cordova/www`  
    *Description:* Configured to be vites build output directory, this holds the application 

- `./public`  
  *Description:* Static assets like images reside here

- `./src`  
  *Description:* All project code resides here



## Getting Setup

**Note:** This application was developed using `Node v18.20.4`, `Cordova v12.0.0`. Both Node and Cordova must be installed on the system building the application. 

- Install all supporting libraries and platforms 	
<small>**Note:** `npm install` must be run twice, once for each package json. While this is not ideal it is necesary as our application was written with `modules` rather than `commonjs` which cordova requires. </small>

```bash
npm install
cd cordova
npm install
cordova platform add android
```

- Running in development mode (Hot Module Replacement or live preview)
```bash
npm run dev
```
- Creating a release build 	
<small>**Note:** The build output directory has been set to `./cordova/www` rather than `./dist`. These files are what you would upload to your webserver if hosting as a webapp.</small>
```bash
npm run build
``` 
- Running on Android	
<small>**Note:** These commands use `cordova` command, and must be run from the `./cordova` directory. This command will look for any running android emulator, or connected android device in developer mode to install to.</small>

```bash
cordova run android
```

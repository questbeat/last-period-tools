# Last Period Tools

![Build](https://github.com/questbeat/last-period-tools/workflows/Build/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/6d93b567-8d91-4c7b-aad9-73e115f3137f/deploy-status)](https://app.netlify.com/sites/last-period/deploys)

iOS/Android 向けゲーム「[ラストピリオド -終わりなき螺旋の物語-](http://lastperiod.happyelements.co.jp/)」向けのツール集です。

https://last-period.netlify.app/


## Requirements

* Node.js
* TypeScript
* Yarn


## Usage

### Setup

```sh
git clone git@github.com:questbeat/last-period-tools.git
cd last-period-tools

yarn install
```

### Run

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

```sh
yarn start
```

### Build

Builds the app for production to the `build` folder.

```sh
yarn build
```

### Generate regalia data

```sh
make sheet definitions
```


## License

Last Period Tools is [MIT Licensed](LICENSE).

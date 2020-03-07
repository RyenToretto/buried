# Buried

a buried point tool

## features

* Auto report data periodically
* Report data mutually
* custom cache method
* custom report method

## install

```bash
npm install buried
# or
yarn add buried
```

## usage

```javascript
import Buried from 'buried'

const buried = new Buried({
  url: 'your/server/url',
  period: 1000 * 60 // auto report period
})

buried.put({ ua: window.navigation.userAgent, path: window.location.href }) // add data to store

buried.report() // report to server
```

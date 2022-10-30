# Eduardo's Lab built with Next.js & TypeScript
## How to use
Install it and run:

```sh
npm install
npm run dev
```

## About
This is a project showcase for an App build with [Next.js](https://nextjs.org/) with the [Material UI](https://mui.com/) component library.

## API
To test

### Pages
The test page


## Design decisions taken
#### Metamask Disconnection:

It's currently not possible to trigger a proper disconection from metamask. To do this correctly the user has to disconnect from the extension itself. https://github.com/MetaMask/metamask-extension/issues/8990.
The approach taken here was to show the user a modal with instructions on how he can disconnect using metamask when the disconnect button is pressed.


#### Use-Metamask and server side rendering:

The use-metamask library is not compatible with server side rendering apps by default since it uses global window. 
There is currently an open pr (https://github.com/mdtanrikulu/use-metamask/pull/19) with a fix for this issue (https://github.com/mdtanrikulu/use-metamask/issues/18).
More info about the issue: https://dev.to/apkoponen/how-to-disable-server-side-rendering-ssr-in-next-js-1563
To bypass this the component that uses the use-metamask library was wrapped in a component that disables rendering nested components in server side.

#### Use-Metamask connect after disconnect:

The library will not connect after being disconnected from metamask. To bypass this issue the connect button will trigger a page reload which in turn will trigger the use effect that starts the use-metamask connection.

## Issues
* Metamask animated logo dual viewer bug occurs when running locally. Need to investigate more to understand why this occurs.

## Improvements
* [ ] Add SEO component to pages, title and description!!!
* [x] Make home layout responsive
* [ ] Add css to make images responsive
* [ ] Typing: Extend TS usage to JS files.
* [ ] Refactor crypto file, may be too much code in one file
* [ ] Add some basic front end tests


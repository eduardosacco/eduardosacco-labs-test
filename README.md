# Eduardo's Lab built with Next.js, Material UI & TypeScript

## About
This is a project showcase for an App build with [Next.js](https://nextjs.org/) with the [Material UI](https://mui.com/) component library.

## Deployed Site
https://eduardosacco-labs-test.vercel.app/

## How to use locally
Install it and run:

```sh
npm install
npm run dev
```

Navigate to http://localhost:3000/

## API
API that accepts an integer and returns a string of words that represent said integer.
Due to the way that Next.js works the it is located in the `pages/api/` path.
Since the file name is actually representing the API route the file was named `number-to-words` to be more descriptive of what the endpoint is doing (vs `convert.js`).
The API is written in TS since I like strongly typed a lot more than JS for back end.

How to use:
Req: `/api/number-to-words?number=342` => Res: `{"data":"three hundred forty-two"}`

## Pages
The App has 3 pages.

#### Home page
It has some content about me and some of the (public) projects I've done. It has some responsive card components (CardLongResponsive) and the projects are displayed using the Album component.

#### Number to words page
Due to the way Next.js works its located in the `test/[[..number]].js` path, this is to enable an [optional catch all dynamic route](https://nextjs.org/docs/routing/dynamic-routes) for the variable number in the test url path.

The page has some basic input with validations and when the convert button is clicked the page is pre rendered on server and due to the use of Next.js [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props).

#### Crypto

This page leverages the use-metamask library to connect to [Metamask](https://metamask.io/). It will automatically trigger a connection request to Metamask if not connected. Once connected it will show the currently connected account. 
The also allows the user to switch blockchains, If a selected blockchain does not exist on Metamask the page will request it to be added.

This page required some design decisions to be taken around some limitations of the use-metamask library. Read more about this in the design decisions section.

## Cool additions

To add some fizz to the Crypto page I added a component to show the [animated Metamask logo](https://www.npmjs.com/package/@metamask/logo). Also the page will show a [Blockies](https://github.com/ethereum/blockies) icon for the account. If Blockies are used in Metamask as account avatars it will show the corresponding one to the connected account.

To experiment with the theming capabilities of Material UI a theme switcher was added to the NavBar. This enables switching from dark to light themes. Dark themes are _objectively_ way cooler so thats the default.

## Design decisions taken

#### Metamask Disconnection:

It's currently not possible to trigger a proper disconnection from metamask. To do this correctly the user has to disconnect from the extension itself. https://github.com/MetaMask/metamask-extension/issues/8990.
The approach taken here was to show the user a modal with instructions on how he can disconnect using metamask when the disconnect button is pressed.

#### Use-Metamask and server side rendering:

The use-metamask library is not compatible with server side rendering apps by default since it uses global window. 
There is currently an open pr (https://github.com/mdtanrikulu/use-metamask/pull/19) with a fix for this issue (https://github.com/mdtanrikulu/use-metamask/issues/18).
More info about the issue: https://dev.to/apkoponen/how-to-disable-server-side-rendering-ssr-in-next-js-1563
To bypass this the component that uses the use-metamask library was wrapped in a component that disables rendering nested components in server side.

#### Use-Metamask connect after disconnect:

The library will not connect after being disconnected from metamask. To bypass this issue the connect button will trigger a page reload which in turn will trigger the use effect that starts the use-metamask connection.

## Known issues
* Metamask animated logo dual viewer bug occurs when running locally. Need to investigate more to understand why this occurs. Hypothesis: Its related to SSR, first test of wrapping the component with disable SSR did not solve it though.

## Possible improvements
* [x] Add SEO component to pages, title and description!!!
* [x] Make home layout responsive
* [x] Add css to make images responsive
* [ ] Add image loader spinner or placeholder
* [ ] Typing: Extend TS usage to JS files.
* [ ] Refactor crypto file, may be too much code in one file
* [ ] Add some basic front end tests

## Possible future additions
* [ ] Create a page to interact with the lottery contract

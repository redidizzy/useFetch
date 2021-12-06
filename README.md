# useFetch hook

This project represents my take on the useFetch hook which is a hook that is meant to make using the fetch api easier using React.

The hook stores the data return by the multiple endpoints passed to it in a redux store. It also compresses it and saves it in the local storage of the browser for caching purposes.

prod : https://use-fetch-1l3ro6d0y-redidizzy.vercel.app

## Documentation

### useFetch

#### Master branch

The useFetch hooks takes a callback that returns an object containing the different fetch calls you want to send.

```
  const [result, isLoading] = useFetch((fetch) => ({
    firstRequest: fetch('firstEndpoint')
    secondRequest: fetch('secondEndpoint')
    .
    .
    .
  }))
```

the hooks returns an array that contains the result as its first element and a state for seeing if the request is still pending (isLoading)

the useFetch module also exports a configure function that allows you to
variously preconfigure the fetch call (for example, by adding a baseUrl)

#### function-instead-of-useEffect branch

The function-instead-of-useEffect branch works in a similar way in this branch, the only difference is that it returns a "rerun" function that allows you to launch your fetch calls wherever you want (For example, by attaching it to event listeners like onClick)

#### multilevel branch

The useFetch hook here takes a second argument, which is the name of the key that will be used to save the data returned(in redux AND in local storage).

It can allow you to use multiple useFetch without having to override the data saved in redux/localstorage.

### helpers.js

Contains multiple helpers/utilities function to keep the main useFetch.js function clean.

It also contains a compresser object that contains the compress/decompress logic using LZString.

To avoid spending more than 200ms during the compression, the compresser tries to compress each chunk of data one by one (depending on the key of each object) and increment the time spent each time, whenever the time spent is bigger than 200ms. we stop the compressing process and continue filling the cache normally.

### Components

#### App.js

The main component, also the one where you can see how i used the useFetch hook.

#### ErrorBoundary.js

This is the component that is used to gracefully manage the case where no Provider is defined.

#### MyFancyLoader.js

As its name suggests, this container shows a loader and is meant to render whenever the useFetch's requests are pending

#### GamesList.js

Just a dummy component to show the result return by the hook

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

1. Concurrently: we install this npm package using the command npm i concurrently, this package will let us start our server along with our react application using one command in one terminal, So we don't have to create two terminals and start both of them one by one even though doing this wouldnt make that much difference doing it with two terminals will be perfectly fine but we can do it using one command with concurrently, to start a server and react application using one command we just add one script object in our package.json "both": "concurrently \"npm run start\" \"nodemon backend/index.js\""  now we can do npm run both in the terminal and it will start the server and the react application together

2. I've always wonder why things like console.log() happens twice whenever I do it once so whatever i do doesnt happen twice like if I'm fetching something it doesnt happen twice but it logs it twice, and I fount this out that it is just logging it twice when i was using a hook called useLocation which  was imported from react-router-dom and i console.log() the location whenever the path is changed, the code snippet: 
let location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location])

  in the above code i am logging the location it logs it with a key in the location object and whenever change the path a new key is logged even though the path is changed and then changed back to it it will have a unique key everytime

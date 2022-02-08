# Rekko
Discover products you’ll love from a community you trust. 

The project directory structure is as following: 
```
|__client/  ** THIS IS EVERYTHING FROM THE REACT SIDE **
    |__ node_modules/
        |__ tons of stuff...
    |__ public/
        |__ index.html
        |__ favicon.ico
        |__ etc.
    |__ src/
        |__ index.js
        |__ App.js/
        |__ Components ** INDIVIDUAL COMPONENTS **
            |__ SearchBar
            |__ CustomTextField
        |__ Pages ** DIFFERENT PAGES **
        |__ etc.
    |__etc.
|__ models/ ** DATA SCHEMAS **
    |__ user.model.js
    |__ etc.
|__ node_modules/
    |__ stuff...
|__ routes ** API ROUTES **
    |__ index.js
|__ controller ** API LOGIC **
    |__ index.controller.js
|__ .gitignore
|__ package.json
|__ app.js ** MAIN SERVER FILE **
|__ etc.
```
# fullstackopen
Repositorio hecho para los ejercicios del curso de fullstack open

sequenceDiagram
    participant browser
    participant server

   browser ->> server: POST: with note data [note,date]
   server -->> browser: 302: Redirect to notes page
   browser ->> server: GET: https://studies.cs.helsinki.fi/exampleapp/notes
   server -->> browser: text/html: webpage content
   browser ->> server: GET: https://studies.cs.helsinki.fi/exampleapp/main.css
   server -->> browser: text/ccs: main.css code
   browser ->> server: GET: https://studies.cs.helsinki.fi/exampleapp/main.js
   server -->> browser:app/js: main.js code
   browser ->> server: GET: https://studies.cs.helsinki.fi/exampleapp/data.json
   server -->> browser: app/json: data.json content

1. npm init
2. npm i express
3. npm i mongoose
4. npm i nanoid --> install "nanoid" library, used for generating random id of specified length.
5. npm i nodemon --> automatically restarts the server if any changes are made

Routes:
1. POST (/URL): Generates a new short URL and returns the shortened URL in the format of "example.com/random-id"
2. GET (:/id): Redirects to the original URL
3. GET (/URL/analytics/:id): return the no. of clicks for the provided short id.

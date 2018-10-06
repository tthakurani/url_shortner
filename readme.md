# DB Setup
- create a `local_config.js` file from `local_config.js` if you are running locally, On other enviourments you will have to save configuration in env variables (You can do it for local as well).
- Add your DB config in local_config.js

# Indtall Dependencies:
```sh
$ npm install
```

# Start Server:
```sh
$ npm run start
```

# API:
##### Create Short Url
**Description:** Creates a new record
**Method:** POST
**Endpoint:** /r
**Body:**
```javascrip
{ url: "https://example.com" }
```
##### Get All Records
**Description:** Returns the list of records (*Without Pagination*)
**Method:** GET
**Endpoint:** /r

##### Delete A Record
**Description:** Deletes the record records (*Hard Delete*)
**Method:** DELETE
**Endpoint:** /r/<shorten_code>

##### Go to full path
**Description:** redirects user to the full path
**Method:** GET
**Endpoint:** /r/<shorten_code>

##### Bulk Add
**Description:** Takes a csv or url to create short urls. Returns the list of all the urls with message specifing (invalid, existing, new)
**Method:** POST
**Endpoint:** /r/bulk
**body:**
send file with key `csvFile` in `form-data`. Csv does not require header just list of urls *one per line*

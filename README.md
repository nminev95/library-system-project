# **ReadMe** - online book library

<br/>

## Description
<br/>
 **ReadMe** is an online book Library.  It is a single-page application that allows the users to borrow books. Users can write a review for a single book and rate it. They are able to delete or edit their review, to update their profile. They can also view and like/ dislike the reviews written by others. Only the admin user is able to add, edit and delete book. He can also ban and delete basic users.

---

##  Project Requirements

<br/>

### Server

1. To run our project locally, clone this repository.

    Run `npm install` in the main folder directory.

    Please use latest version of `node`.

    To run the application locally and visit `[localhost:4000]` to explore.


2. Setup MySQL Database with new Schema.

3. Import in a new SQL Query Tab all of the contents of `populate-initial-data.sql`.

4. Setup `config.js` file. It needs to be on root level in api folder where is `package.json` and other config files.

   - `config.json` file with your settings:

   ``` sh
    {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'your-password-goes-here',
      database: 'mydb',
     };
    ```

5. After files are setup open the terminal and run the following command:

    `npm run start:dev`
  
---

### Client

6. Navigate to the `client` folder. Open the terminal and run the following commands:

  ```sh
  $ npm install
  ```

  ```sh
  $ npm run start
  ```


---

### Built With

 - [React JS](https://reactjs.org/) - library used for our client.
 - [Express.js](https://expressjs.com/)
 - [Material Design for Bootstrap](https://mdbootstrap.com/) - to design our components in the client.
 - [JWT](https://jwt.io/) - for authentication.

---

### What helped in our research and coding:

- [Express.js Documentation](https://expressjs.com/)
- StackOverflow, Medium, etc.

---

### Special thanks goes to: 

Our devoted trainers - _Edward Evlogiev_ and _Rosen Urkov_

*We put a lot of work, passion and emotions in it!* 

---

### Authors and Contributors

- Mariya Velikova -  `m.velikovaa@gmail`
- Niki Minev  -  `n.minev42@gmail`
# ReelTalkProject

#### Steps to run the project:

```
git clone https://github.com/ishasrivastavaa/ReelTalkProject.git
cd ReelTalkProject
```
Fill out the variables in the sample env files with your details. 

After we have successfully set up env files, we will start the backend server by:

```
npm install
node app.js
```

This should boot up the app. 

The following APIs are set up in this project:

- POST /user/signup
- POST /user/signin
- POST /user/update
- GET /movies
- POST /likes/save
- GET /likes/fetch

The save and fetch APIs require an authorization token which is provided when the user signs up or signs in.

> ### POST /user/signup POST /user/signin request body:
>> {
    "email": "",
    "password": ""
   }

> ### POST /user/update request body:
>> {
    "email": "",
    "oldPassword": "",
    "newPassword": ""
   }

> ### POST /likes/save request body :
>> {
    "postId": "",
    "commentId": "",
   }
>
> One of these two values can be null at a time



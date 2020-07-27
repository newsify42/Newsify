# Welcome to the Dark Site

**Note:** Request bodies that use *loginToken* will be handled automatically by cookies in the future, but you need to pass them manually for now.

## Users

**POST /users/register**

**Description:** Registers a new user on the database. Sends a confirmation email to verify the email address.

Request body:

```
{
  "email": "example@examplemail.com",
  "password": "12345"
}
```

Response body:
```
{
    "message": "New User Created",
    "id": "5f1eca79a70b3d1f3a860ade",
    "email_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWVjYTc5YTcwYjNkMWYzYTg2MGFkZSIsImlhdCI6MTU5NTg1MzQzMywiZXhwIjoxNTk1ODY0MjMzfQ.XZyvBuluS76tPLSyO9zQTo-hwxp2xpq6ZAsMJyqty-E"
}
```

**POST /users/register**

**Description:** Registers a new user on the database. Sends a confirmation email to verify the email address.

Request body:

```
{
  "email": "example@examplemail.com",
  "password": "12345"
}
```

Response body:
```
{
    "message": "New User Created",
    "id": "5f1eca79a70b3d1f3a860ade",
    "emailToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWVjYTc5YTcwYjNkMWYzYTg2MGFkZSIsImlhdCI6MTU5NTg1MzQzMywiZXhwIjoxNTk1ODY0MjMzfQ.XZyvBuluS76tPLSyO9zQTo-hwxp2xpq6ZAsMJyqty-E"
}
```


**POST /users/login**

**Description:** Login a registered user in the database and returns a login token. **Note:** You need to confirm the email before you can login.

Request body:

```
{}
```

Response body:
```
{
    "message": "User Logged In",
    "id": "5f1eca79a70b3d1f3a860ade",
    "loginToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWVjYTc5YTcwYjNkMWYzYTg2MGFkZSIsImlhdCI6MTU5NTg1NDM5NywiZXhwIjoxNTk1ODY1MTk3fQ.MP652QMHSuMJEFAy2X1cJV-3u_q2ETCsASq70akDaEA"
}
```


**GET /users/confirm_email/:emailToken**

**Description:** Confirms the email for a user in the database using the *emailToken*.

Request body:

```
{}
```

Response body:
```
{
    "message": "Email Confirmed"
}
```


**POST /users/forget_password**

**Description:** Sends a password reset email to the user's email address.

Request body:

```
{
    "email": "example@examplemail.com"
}
```

Response body:
```
{
    "message": "Password Reset Email Sent",
    "emailToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMTg0NWM1MjQ5ZTY2N2EwZjQ0OWY5MCIsImlhdCI6MTU5NTg1NDg4NywiZXhwIjoxNTk1ODY1Njg3fQ.GlAZqWEbq8ILuseKBDIbD2xofZ3St22Qshm45n0qCd8"
}
```


**GET /users/reset_password/:emailToken**

**Description:** Resets the password for the user in the database using the *emailToken*.

Request body:

```
{}
```

Response body:
```
{
    "message": "Password Updated"
}
```


**PATCH /users/update_email**

**Description:** Updates the user's email in the database.

Request body:

```
{
    "loginToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWVjYTc5YTcwYjNkMWYzYTg2MGFkZSIsImlhdCI6MTU5NTg1NDM5NywiZXhwIjoxNTk1ODY1MTk3fQ.MP652QMHSuMJEFAy2X1cJV-3u_q2ETCsASq70akDaEA"
    "password": "123",
    "newEmail": "example@examplemail.com"
}
```

Response body:
```
{
    "message": "Email Updated"
}
```


**PATCH /users/update_password**

**Description:** Updates the user's password in the database.

Request body:

```
{
    "loginToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWVjYTc5YTcwYjNkMWYzYTg2MGFkZSIsImlhdCI6MTU5NTg1NDM5NywiZXhwIjoxNTk1ODY1MTk3fQ.MP652QMHSuMJEFAy2X1cJV-3u_q2ETCsASq70akDaEA"
    "password": "123",
    "newPassword": "12345"
}
```

Response body:
```
{
    "message": "Password Updated"
}
```



**DELETE /users/delete_user**

**Description:** Deletes the user from the database.

Request body:

```
{
    "loginToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWVjYTc5YTcwYjNkMWYzYTg2MGFkZSIsImlhdCI6MTU5NTg1NDM5NywiZXhwIjoxNTk1ODY1MTk3fQ.MP652QMHSuMJEFAy2X1cJV-3u_q2ETCsASq70akDaEA"
    "password": "12345",
}
```

Response body:
```
{
    "message": "User Deleted"
}
```


## Comments

**GET /comments/**

**Description:** Returns all the comments in the database.

Request body:

```
{}
```

Response body:

```
{
  [
    {
        "source": [],
        "likes": 0,
        "dislikes": 0,
        "_id": "5f1c2f8ed5fe6039c1a240a9",
        "userName": "Darragh",
        "postId": 123,
        "comment": "This is a comment!",
        "createdAt": "2020-07-25T13:11:42.881Z",
        "updatedAt": "2020-07-25T13:11:42.881Z",
        "__v": 0
    },
    {
        "source": [],
        "likes": 0,
        "dislikes": 0,
        "_id": "5f1c2f9ad5fe6039c1a240aa",
        "userName": "Aaron",
        "postId": 123,
        "comment": "This is another comment!",
        "createdAt": "2020-07-25T13:11:54.912Z",
        "updatedAt": "2020-07-25T13:11:54.912Z",
        "__v": 0
    }
  ]
}
```


**GET /comments/:id**

**Description:** Returns all the comment specified by *:id* in the database.

Request body:

```
{}
```

Response body:
```
[
  {
    "source": [],
    "likes": 0,
    "dislikes": 0,
    "_id": "5f1c2f8ed5fe6039c1a240a9",
    "userName": "Darragh",
    "postId": 123,
    "comment": "This is a comment!",
    "createdAt": "2020-07-25T13:11:42.881Z",
    "updatedAt": "2020-07-25T13:11:42.881Z",
    "__v": 0
  }
]
```


**POST /comments/**

**Description:** Adds a new comment to the database.

Request body:

```
{
  "loginToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMTg0NWM1MjQ5ZTY2N2EwZjQ0OWY5MCIsImlhdCI6MTU5NTY4NDEzNywiZXhwIjoxNTk1Njk0OTM3fQ.kr_h3tspUHxjhSMuuvlp6FDG3aikR8a-tmNH90ndBk8",
  // userName and postId will be generated or queried automatically in the future
  "userId": "5f1845c5249e667a0f449f90",
  "postId": "5f1c3c51124ec3437b6e78c5",
  "comment": "This is a comment!"
}
```

Response body:
```

{
  "message": "Comment Created",
  "id": "5f1c2f8ed5fe6039c1a240a9"
}

```

**PATCH /comments/:id**

**Description:** Updates the comment specified by *:id* in the database.

Request body:

```
{
  "loginToken": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMTg0NWM1MjQ5ZTY2N2EwZjQ0OWY5MCIsImlhdCI6MTU5NTY4NDEzNywiZXhwIjoxNTk1Njk0OTM3fQ.kr_h3tspUHxjhSMuuvlp6FDG3aikR8a-tmNH90ndBk8,
  "newComment": "This is an updated comment!"
}
```

Response body:
```
{
  "message": "Comment Updated",
}
```

**DELETE /comments/:id**

**Description:** Deletes the comment specified by *:id* in the database.

Request body:

```
{
  "loginToken": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMTg0NWM1MjQ5ZTY2N2EwZjQ0OWY5MCIsImlhdCI6MTU5NTY4NDEzNywiZXhwIjoxNTk1Njk0OTM3fQ.kr_h3tspUHxjhSMuuvlp6FDG3aikR8a-tmNH90ndBk8,
}
```

Response body:
```
{
  "message": "Comment Deleted"
}
```

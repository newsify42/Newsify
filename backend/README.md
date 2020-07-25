# Welcome to the Dark Site

**Note:** Request bodies that use *loginToken* will be handled by the cookies in the future, but you need to pass them manually for now.

## Users



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
  "userName": "Darragh",
  "postId": "123",
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

**GET /comments/:id**

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

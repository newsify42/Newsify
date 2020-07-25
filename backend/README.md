## User

## Comments

**POST /comments/**

**Description:** Returns all the comments in the DB.

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

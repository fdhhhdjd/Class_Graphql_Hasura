## GET
```graphql
query {
  user {
    created_at
    email
    fullname
    id
    password
    updated_at
  }
}
```

## Real Time

```
subscription GetUser {
  user(order_by: {id: desc}) {
    email
    fullname
    created_at
    id
  }
}
```


## GET
```graphql
query {
  user {
    created_at
    email
    fullname
    id
    password
    updated_at
  }
}
```

## CREATE
```graphql
mutation CreateUser {
    insert_user(objects: {email: "nguyentientai@gmail.com", fullname: "Tài Là siêu nhân", password: "e41098a9e5329a6d8e57f8ea10e7031d5afbaee70fe1df2"}) {
      returning {
        id
      }
    }
}

mutation InsertUserAndComment {
  insert_user_one(object: {email: "tai@gmail.com", fullname: "lala", password: "qăedasdasdasdasd", comments: {data: {comment: "Tôi là ai"}}}) {
    id
    fullname
    email
    comments {
      comment
    }
  }
}

mutation CreateUser($email:String!,$fullname:String!,$passsword:String!) {
    insert_user(objects: {email: $email, fullname: $fullname, password: $passsword}) {
      returning {
        id
        fullname
        created_at
      }
    }
}


{
  "email":"tailatoi@gmail.com",
  "fullname":"Toi la ai ke toi",
  "passsword":"asdasdasdasdasdas"
}

```


# DELETE
```graphql
mutation DeleteComment {
  delete_comments_by_pk(id: "e1685d48-c649-488b-a4c3-967197ab333d") {
    id
  }
}

mutation DeleteComment {
  delete_comments(where: {id: {_eq: "e1685d48-c649-488b-a4c3-967197ab333d"}}) {
    affected_rows
    returning {
      id
      comment
    }
  }
}
```


# ACTION

```graphql
type Mutation {
    CreateUser(input: SignupInput!): SignupOutput
}

type User {
    id: String!
    fullname: String!
    email: String!
}

type SignupOutput {
  status: Int!
  message: String!
  option: String!
  metadata: String!
}


input SignupInput {
    fullname: String!
    email: String!
}


mutation {
  CreateUser(input: {email: "a@gmail.com", fullname: "ádasdasd"}) {
    message
    status
    option
  }
}


```
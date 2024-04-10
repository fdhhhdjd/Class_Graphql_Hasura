# Solution
1. Database control <=>  Admirer
2. Event Trigger, cron 
3. Query graphql => Query PG4

<!-- curl -L https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh | bash -->
<!-- hasura init --endpoint http://localhost:8080 --admin-secret class_docker -->
<!-- cd metadata && hasura metadata apply -->
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
<!-- {{GRAPHQL_ENGINE_BACKEND_API_URL}}/api/v1/auth/signup -->
```graphql
type Mutation {
    CreateUser(input: SignupInput!): SignupOutput
}

input SignupInput {
  fullname: String!
  email: String!
}

type SignupOutput {
  status: Int!
  message: String!
  option: String!
  metadata: User!
}

type User {
  fullname: String!
  email: String!
}

mutation MyMutation {
  CreateUser(input: {email: "q@gmail.com", fullname: "123123"}) {
    message
    status
    option
    metadata {
      email
      fullname
    }
  }
}



```
# Overview

This is a MERN Stack simple task asssessment for the checking skill and experience of candidate.

## Feature

- Task Mangement (create,delete,get);
- Authentication Using JWT

## Technologies Used

### Backend

-Node.js
-Express.js
-JWT for (session tracking)

- bcrypt for hashing
  -Prisma for ORM
  -Postgress database for data store

### Frontend

-React.js
-Tailwind CSS
-Reduxtoolkit
-React router dom

## How to run server

- Open `bash` or `terminal`
- Clone the github respository using command `git clone https://github.com/dammar093/task-managment.git`
- Go to server folder using command `cd server folder`
- Install dependencies using command `npm i` or `npm install`
- Create `.env` file in the root directory
- Add

```PORT = 8000
  CORS_ORIGIN = "*"
  JWT_SECRET = "your_jwt_secret"
  DATABASE_URL=""
```

in your .env file

- Run the server using command `npm run dev`

## Modle

```
  model User {
  id       String  @id @default(uuid())
  name     String?
  email    String? @unique
  password String?
  Task     Task[]
}

model Task {
  id          String @id @default(uuid())
  title       String
  description String
  userId      String
  user        User   @relation(fields: [userId], references: [id])
}
```

## Api end point

### Auth api

http://localhost:8000/api/v1/auth/register (for register user)

#### Request Body Payload

```
{
  "name":"John Doe",
  "email":"johndoe@gmail.com",
  "password":"123456"
}
```

##### Validation

- All field are required
- Email must be valid email
- Password length atleaset 6

### Response

```
{
  statusCode:201,
  data:null,
  message:"User created successfully"
}
```

http://localhost:8000/api/v1/auth/login (for login user)

#### Request Body Payload

```
{
  "email":"johndoe@gmail.com",
  "password":"123456"
}
```

##### Validation

- All field are required
- Email must be valid email
- Password length atleaset 6

### Response

```
{
  statusCode:200,
  data:{
    name:"John Doe",
    email:"johndoe@gmail.com",
    id:"weheiru49r043rp",
    token:"jskfslfks;lfksl;"
  },
  message:"Login successfully"
}
```

http://localhost:8000/api/v1/auth/logout (for logout user)

```
{
  statusCode:200,
  data:null,
  message:"Logout successfully"
}
```

### API end point for taks

http://localhost:8000/api/v1/tasks/create (for create task)

#### Request Body Payload

```
{
  "title":"title",
  "description":"description"
}
```

##### Validation

- All field are required

### Response

```
{
  statusCode:201,
  data:{
    title:"title",
    desctiption:"description",
    id:"weheiru49r043rp",
  },
  message:"Tasks created successfully"
}
```

http://localhost:8000/api/v1/tasks/:id (for delete task)

#### Request Body Payload

### Response

```
{
  statusCode:200,
  data:{
    title:"tilte",
    desciption:"description",
    id:"weheiru49r043rp",
  },
  message:"Task deleted successfully"
}
```

http://localhost:8000/api/v1/tasks/:id (for get all task related user)

```
{
statusCode:201,
data:{
title:"title",
desctiption:"description",
id:"weheiru49r043rp",
},
message:"Tasks fetched successfully"
}
```

# How to run react app

- Open `bash` or `terminal`
- Clone the github respository using command `git clone https://github.com/dammar093/task-managment.git`
- Go to client folder using command `cd clinet  folder`
- Install dependencies using command `npm i` or `npm install`
- Create `.env` file in the root directory
- Add

```
VITE_API_URL = https://task-managment-ppt9.onrender.com/api/v1
```

in your .env file

- Run the client using command `npm run dev`

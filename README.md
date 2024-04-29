# Lightie Request

Lightie Request is a lightweight, simple, and open-source library for making HTTP requests.

![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)	![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Installation

To install the library, execute the following command:

```bash
npm install lightie-request
```

### Usages
First, import the library:

```javascript
import { req } from 'lightie-request';
```

You can initialize the library with a base URL:
```javascript
req.init('http://localhost:3000');
```
If you don't pass any URL, it will default to "http://localhost:80".

Lightie Request allows you to make five types of HTTP requests:

### Get
```javascript
const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC...'
}

const options = {
    headers: headers
}
req.get('/path/to/resource', options);
```

### Post
```javascript
const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC...'
}
const data = { key: 'value' }
const options = {
    body: data,
    headers: headers
}
req.post('/path/to/resource', options);
```

### Patch
```javascript
const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC...'
}
const options = {
    body: data,
    headers: headers
}
const data = { key: 'value' }
req.patch('/path/to/resource', options);
```

### Put
```javascript
const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC...'
}
const options = {
    body: data,
    headers: headers
}
const data = { key: 'value' }
req.put('/path/to/resource', options);
```

### Delete
```javascript
const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC...'
}
const options = {
    headers: headers
}
req.delete('/path/to/resource', options);
```

By default, it sends 'Content-Type': 'application/json' in the headers.

### Contribuitions

I'm excited to announce that I'm starting to maintain this open-source repository, and I'm eager to welcome contributions, tips, and suggestions from anyone interested. As someone who is new to maintaining open-source projects, I greatly appreciate any help and guidance that experienced contributors can offer.

All contributions are valuable, regardless of your level of experience. Whether you're a seasoned developer or just starting out, your input is highly valued and welcomed here.

I'm particularly interested in receiving contributions related to documentation, code testing, and implementation of new features. If you're interested in contributing but not sure where to start, please feel free to reach out or refer to the README file for instructions on getting involved.

I want to express my gratitude in advance to all contributors for their time and effort!

Thank you!
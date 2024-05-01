# Lightie Request

Lightie Request is a lightweight, simple, and open-source library for making HTTP requests.

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

[![Coverage Status](https://coveralls.io/repos/github/uriielfl/lightie-request/badge.svg)](https://coveralls.io/github/uriielfl/lightie-request)

## Installation

To install the library, execute the following command:

```bash
npm install lightie-request
```

## Usages
First, import the library:

```javascript
import { req } from 'lightie-request';
```

You can initialize the library with a base URL:
```javascript
req.init('http://localhost:3000');
```
If no URL is provided, 'http://localhost:80' will be used as the default.

Lightie Request allows you to make five types of HTTP requests:
### Methods

#### Get

```javascript

req.get('/path/to/resource');
```

#### Post
```javascript
const data = { key: 'value' }

req.post('/path/to/resource', data);
```

#### Patch
```javascript
const data = { key: 'value' }

req.patch('/path/to/resource', data);
```

#### Put
```javascript
const data = { key: 'value' }

req.put('/path/to/resource', data);
```

#### Delete
```javascript
req.delete('/path/to/resource');
```

By default, it sends 'Content-Type': 'application/json' in the headers.

### Headers
There are several ways to set headers in requests. You can directly access the headers through the `req`.

```javascript
import { req } from 'lightie-request';

const api = req.headers = { Authorization: 'Bearer 123' }
```
*Please note that this will affect all subsequent requests made using 'req'.*.

You can also set it in the request

```javascript
import { req } from 'lightie-request';

const api = req.init('https://github.com')
const headers = { Authorization: 'Bearer 123' }
api.get('/path', header)
```

And you can also access it through an *interceptor*

```javascript
import { req, IInterceptorCallbackConfig } from 'lightie-request';

const api = req.init('https://github.com')
const jwtKey = '123456'
const interceptors = (config:IInterceptorCallbackConfig) => {
    config.header = { Authorization: `Bearer ${jwtKey}`}
}
api.addInterceptors(interceptor)
const headers = { Authorization: 'Bearer 123' }
api.get('/path', header)
```


### Interceptors

Lightie Request provides you with 2 types of interceptors: *Interceptors*, *InterceptorsByPathName* and *InterceptorsByPathByMethod* 

Interceptors are functions that are executed before each request. They are useful for manipulating headers, for example.

### Adding an Interceptor

To add an interceptor, you can use the `addInterceptor` method. Here's an example:

```javascript
import { LightieRequest, IInterceptorCallbackConfig } from 'lightie-request';

const req = new LightieRequest();
req.init('http://myawesomeapi.com')

const interceptorTest = (config: IInterceptorCallbackConfig) => {
  config.headers = { ...config.headers, Authorization: 'Bearer 123' };
  config.path = '/todos/2';
};

req.addInterceptor(interceptorTest); // No rule
```

In this example, the interceptor adds an authorization header to each request and modifies the request path to '/todos/2'.

### Adding an Interceptors by Path
You can add interceptors that will only run for requests to a specific path using the addInterceptor method. For example:

```javascript
req.addInterceptor(interceptorTest, { path: '/todos/2' });
```
In this example, the interceptor will run for requests to the path '/todos/2' or if the path matches /todos/2 as a regular expression.

You can also pass params and Lightie Request will match them with Regular Expressions
```javascript
req.addInterceptor(interceptorTest, { path: '/todos/{id}' });
```
*This way you can intercept requests that have paths, for example, like: /todo/1, /todo/2, /todo/3, etc...*

And you can specify that you want to match the exact path
```javascript
req.addInterceptor(interceptorTest, { path: '/todos/2', exactPath: true });
```
This way, the interceptor will automatically skip the RegExp test.

### Adding an Interceptors by Method
You can add interceptors that will only run for a specific method using the addInterceptor method. Here's an example:

```javascript
req.addInterceptor(interceptorTest, { method: 'GET' }); 
```
In this example, the interceptor will only run for 'GET' requests.

## Response
If the request is successful (i.e., the promise is resolved), the response will be in the following format:

```javascript
   {
    status: number, // The HTTP status code
    data: any, // The response data
    statusText: string, // The status message associated with the status code
  };
```
If the request fails (i.e., the promise is rejected), a LightieError will be thrown with the following format:

```javascript
  {
    status: number, // The HTTP status code
    statusText: string, // The status message associated with the status code
    message: any // The error message or data
  }
```

### Contribuitions

I'm excited to announce that I'm starting to maintain this open-source repository, and I'm eager to welcome contributions, tips, and suggestions from anyone interested. As someone who is new to maintaining open-source projects, I greatly appreciate any help and guidance that experienced contributors can offer.

All contributions are valuable, regardless of your level of experience. Whether you're a seasoned developer or just starting out, your input is highly valued and welcomed here.

I'm particularly interested in receiving contributions related to documentation, code testing, and implementation of new features. If you're interested in contributing but not sure where to start, please feel free to reach out or refer to the README file for instructions on getting involved.

I want to express my gratitude in advance to all contributors for their time and effort!

Thank you!- [null](null)

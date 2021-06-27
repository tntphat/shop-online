# Store Online
## Introduction
**A project of team SD1, HCMUS K18**

 A website that store owner can manage their products, employees, orders from 
customers,… and customers can order items, ...

## Instruction

We've deployed it on website: https://shop-onl-tntp.netlify.app/

Account for testing:

- Customer:
    - _email_: tester@gmail.com
    - _password_: 1234
- Employee:
    - Navigate to path /admin and log in with this account:
    - _username_: store
    - _password_: admin

## Installation

1. Clone this repository by running this command:
```bash
git clone https://github.com/tntphat/shop-onine.git
```

2. Install necessary packages of client side by running following commands:
```bash
cd shop-online
cd client
npm i 
```

3. Install necessary packages of server side by these commands:
```bash
cd ..
cd server
npm i 
```

4. Start both client and server by following commands:
```sh
cd ..
npm run start
```

## Features

- Customer
    - Authentication
    - Shopping
    - Pay with Stripe
    - Rate products
    - Send message to store
- Employees
    - Authentication and Authorization
    - Each type of employees has different features
    - Store owner has all of them: 
        - Managing products
        - Managing employees
        - Managing authorities
        - Managing categories
        - Managing orders
        - Managing mails
        - Managing import notes


## TechStack

##### Front-end:

- ReactJS
- Redux
- Material UI

##### Back-end:

- Node.js
- Express
- MongoDB

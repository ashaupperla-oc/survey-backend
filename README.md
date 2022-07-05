# vuesurvey

## Installation

### Client

for client Installation head to client directory from main project

```
cd client
```

install package listed in package.json file via npm

```
npm i or npm install
```

### Server

for server Installation head to server directory from main project

```
cd Server

```

install package listed in package.json file via npm

```
npm i or npm install
```

Few todo's:

1. create config file for fronend and backend
2. showcase - survey properly - iteration
3. edit servery for admins
4. edit admin/registration for superadmin
5. Registration page should be visible only to the super admins and not anyone else
6. survey edit - option on getsurvey page only to admin for their own survey and super admin for all survey
7. login logout toggle button
8. create survey button on getsurvey - if its logged in
9. desigining of create-survey page

### How to run

client - vue - npm run dev
server - express node - nodemon .

###

# run server first , once tables are created then execute below script:

INSERT INTO `roles` (`id`, `rolename`, `createdAt`, `updatedAt`) VALUES (NULL, 'admin', '2022-07-04 16:06:55.000000', '2022-07-04 16:06:55.000000');

INSERT INTO `roles` (`id`, `rolename`, `createdAt`, `updatedAt`) VALUES (NULL, 'superadmin', '2022-07-04 16:06:55.000000', '2022-07-04 16:06:55.000000');

INSERT INTO `users` (`id`, `name`, `email`, `password`, `roleId`, `createdAt`, `updatedAt`) VALUES (NULL, 'superadmin', 'superadmin@gmail.com', 'superadmin', '2', '2022-07-04 16:07:27.000000', '2022-07-04 16:07:27.000000');

INSERT INTO `users` (`id`, `name`, `email`, `password`, `roleId`, `createdAt`, `updatedAt`) VALUES (NULL, 'admin', 'admin@gmail.com', 'admin', '1', '2022-07-04 16:07:27.000000', '2022-07-04 16:07:27.000000');

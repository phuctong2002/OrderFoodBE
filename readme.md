# Some api in application


## POST  /api/v1/user/login
Login

Request boody
* email: required, string
* password: required, string

Example: 

```
{ 
    "email": "john.doe@example.com",
    "password": "password123"
}
```



## POST /api/v1/user/register
Register

Request body

* email: required, string
* firstName = required, string
* lastName = required, string
* phone = required, string
* password = required, string

## GET /api/v1/product/category
Get all categories
<!-- dang sua them lan sau co token nue nhe -->


## GET /api/v1/product/category/:category
Get all dish have category

Request parameters

* category: required, string

## GET /api/v1/product/dish/:dishId
Get detail of dish

Request parameters

* dishId: required, string




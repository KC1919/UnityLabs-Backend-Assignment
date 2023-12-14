**Steps to run the application**

Step-1: Clone the repository

Step-2: Make sure Node js is installed on the server system, if not installed then download install node js.

Step-3: Execute command: 'npm run start' OR node app.js.

Step-4: If the Step-3 is successfull, the application will start running and the server would listen on port 3000 for any incoming requests.

Step-5: Make use of Postman or Thunder-Client, to make API calls to the application.

**Authentication API's**

1.) Register API: http://localhost:3000/api/auth/register  (POST)

    request-body: Pass a JSON object with user's name,username,password and userType.

    Example: 
    {
      "name":"Test-buyer",
      "username": "test_buyer@email.com",
      "password":"123456789",
      "userType":"buyer"
    }

2.) Login API: http://localhost:3000/api/auth/login  (POST)

  Request-Body-Example:
  {
    "username":"test_buyer@email.com",
    "password":"123456789",
    "userType":"buyer"
  }

3.) Logout API: http://localhost:3000/api/auth/logout (GET)   , Pass header- Authorization: Bearer JWT-Token

**Buyers API's**

1.) Get a list of all sellers: http://localhost:3000/api/buyer/list-of-sellers  (GET)  ,Pass header- Authorization: Bearer JWT-Token

Sample Response Data:

{
  "message": "List of available sellers!",
  "status": "success",
  "data": {
    "sellers": [
      {
        "_id": "657b039d4bab09f0b13bc524",
        "name": "Seller-1",
        "email": "seller1@email.com",
        "__v": 0,
        "userType": "seller"
      },
      {
        "_id": "657b03a54bab09f0b13bc527",
        "name": "Seller-2",
        "email": "seller2@email.com",
        "__v": 0,
        "userType": "seller"
      }
    ]
  }
}

Pass the any _id of a seller, received from the above list of seller data

2.) Get the catalog of a seller by seller_id:  

API: http://localhost:3000/api/buyer/seller-catalog/657b03a54bab09f0b13bc527   (GET)  ,Pass header- Authorization: Bearer JWT-Token

Sample Response Body:

{
  "message": "List of available sellers!",
  "status": "success",
  "data": {
    "sellerData": {
      "seller": {
        "_id": "657b039d4bab09f0b13bc524",
        "name": "Seller-1",
        "__v": 0,
        "userType": "seller"
      },
      "catalog": [
        {
          "name": "Product-1",
          "price": "Rs.170",
          "_id": "657b1410dab7ef6776dacd85"
        },
        {
          "name": "Product-2",
          "price": "Rs.180",
          "_id": "657b1410dab7ef6776dacd86"
        },
        {
          "name": "Product-3",
          "price": "Rs.120",
          "_id": "657b1410dab7ef6776dacd87"
        },
        {
          "name": "Product-4",
          "price": "Rs.250",
          "_id": "657b1410dab7ef6776dacd88"
        },
        {
          "name": "Product-5",
          "price": "Rs.90",
          "_id": "657b1410dab7ef6776dacd89"
        }
      ]
    }
  }
}

3.) Send a list of items to create an order for seller with id = seller_id

API: http://localhost:3000/api/buyer/create-order/657b039d4bab09f0b13bc524  (POST)  ,Pass header- Authorization: Bearer JWT-Token

Sample Request Body: Send array of objects, with each object having the product name and price.

{
  "orderData":[
    {
      "name":"Product-1",
      "price":"Rs.170"
    },
    {
      "name":"Product-2",
      "price":"Rs.180"
    },
    {
      "name":"Product-2",
      "price":"Rs.130"
    }
  ]
}

**Seller API's**

1.) Send a list of items to create a catalog for a seller

API: http://localhost:3000/api/seller/create-catalog/  (POST)  ,Pass header- Authorization: Bearer JWT-Token

Sample Request Body: An array of product objects, with name and price of the product

{
  "products":[
    {
      "name":"Product-1",
      "price": "Rs.170"
    },
    {
      "name":"Product-2",
      "price": "Rs.180"
    },
    {
      "name":"Product-3",
      "price": "Rs.120"
    },
    {
      "name":"Product-4",
      "price": "Rs.250"
    },
    {
      "name":"Product-5",
      "price": "Rs.90"
    }
  ]
}

2.) Retrieve the list of orders received by a seller 

API: http://localhost:3000/api/seller/orders/   (GET)  ,Pass header- Authorization: Bearer JWT-Token

Sample Response Body:

{
  "message": "Customer Orders",
  "status": "success",
  "data": {
    "orders": {
      "_id": "657b039d4bab09f0b13bc524",
      "orders": [
        {
          "buyer": "657b03cf16faa550e20697b4",
          "products": [
            {
              "name": "Product-1",
              "price": "Rs.170",
              "_id": "657b233a268d6d94ea49fd3a"
            },
            {
              "name": "Product-2",
              "price": "Rs.180",
              "_id": "657b233a268d6d94ea49fd3b"
            },
            {
              "name": "Product-2",
              "price": "Rs.130",
              "_id": "657b233a268d6d94ea49fd3c"
            }
          ],
          "_id": "657b233a268d6d94ea49fd39"
        }
      ]
    }
  }
}


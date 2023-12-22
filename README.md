# Kucingku-API
Kucingku RestAPI



# How To Use

* ### User Interest ###
  URL User Interest Route: `http://127.0.0.1:3000/UserInterest/`


* **[GET]** Get All User Interest Data

  Header :
    * **Content-Type:** application/json
    * **Authorization:** Token
    
    Response:
    ```json
    {
      "userInterest": [
            {
                "id": "kCKQAHrzUHfQ6tBI5HdT",
                "user_gender": "male",
                "user_age": "16",
                "cat_age" : "adult",
                "cat_gender" : "male",
                "cat_size" : "large",
                "cat_breed" : "local"
            },
        ]
    }
    ```

* **[GET]** Get Specific User Interest Data
  
    Additional Route: `<:id>`

    Response:
    ```json
    {
        "id": "kCKQAHrzUHfQ6tBI5HdT",
        "user_gender": "female",
        "user_age": "23",
        "cat_age" : "young",
        "cat_gender" : "female",
        "cat_size" : "medium",
        "cat_breed" : "siamese"
    }
    ```

* **[POST]** Add New User Interest

    Request: 
    ```json
    {
        "user_gender": "string",
        "user_age": "string",
        "cat_age" : "string" or ["array"],
        "cat_gender" : "string" or ["array"],
        "cat_size" : "string" or ["array"],
        "cat_breed" : "string" or ["array"]
    }
    ```
    Response:
    ```json
    {
        "msg": "UserInterest Created Successfully"
    }
    ```

* **[PATCH]** Edit User Interest

    Additional Route: `<:id>`
  
    Request:
    ```json
    {
        "user_gender": "string",
        "user_age": "string",
        "cat_age" : "string" or ["array"],
        "cat_gender" : "string" or ["array"],
        "cat_size" : "string" or ["array"],
        "cat_breed" : "string" or ["array"]
    }
    ```
    Response:
    ```json
    {
        "msg": "UserInterest Updated Successfully"
    }
    ```
* **[DELETE]** Delete Specific User
  
    Additional Route: `<:id>`
    
    Response:

    ```json
    {
        "msg": "UserInterest Deleted Successfully"
    }
    ```


---
* ### Shelter Cats ###
  URL Shelter Cat Route: `http://127.0.0.1:3000/Cat/`

* **[GET]** Get All Shelter Cats

  Header :
    * **Content-Type:** application/json
    * **Authorization:** Token

    Response:
    ```json
    {
      "shelterCats": [
            {
                "id": "NqrqA63U7r3D5ricyh5O",
                "cat_name": "Kitty",
                "cat_age": "Baby",
                "cat_gender": "Female",
                "cat_size": "Small",
                "cat_breed": "Persian",
                "image": "ac6289f89a4aa124c7f4e35b032cce84.jpg",
                "url": "http://127.0.0.1:3000/images/ac6289f89a4aa124c7f4e35b032cce84.jpg"
            },
        ]
    }
    ```

* **[GET]** Get Specific Cat Data
  
    Additional Route: `<:id>`

    Header :
    * **Content-Type:** application/json
    * **Authorization:** Token
    
    Response:
    ```json
    {
        "id": "3D5ricyh5ONqrqA63U7r",
        "cat_name": "Abuy",
        "cat_age": "Adult",
        "cat_gender": "Male",
        "cat_size": "Large",
        "cat_breed": "Local",
        "image": "ac6289f89a4aa124c7f4e35b032cce84.jpg",
        "url": "http://127.0.0.1:3000/images/ac6289f89a4aa124c7f4e35b032cce84.jpg"
    }
    ```

* **[POST]** Add New Cat 

    Request: 
    ```json
    {
        "cat_name": "string",
        "cat_age": "string",
        "cat_gender": "string",
        "cat_size": "string",
        "cat_breed": "string",
        "image": "file",
    }
    ```
    Response:
    ```json
    {
        "msg": "Cat Created Successfully"
    }
    ```

* **[PATCH]** Update Shelter Cat

    Additional Route: `<:id>`
  
    Request:
    ```json
    {
        "cat_name": "string",
        "cat_age": "string",
        "cat_gender": "string",
        "cat_size": "string",
        "cat_breed": "string",
        "image": "file", //Optional
    }
    ```
    Response:
    ```json
    {
        "msg": "Cat Updated Successfully"
    }
    ```

* **[DELETE]** Delete Specific Shelter Cat
  
    Additional Route: `<:id>`

    Header :
    * **Content-Type:** application/json
    * **Authorization:** Token

    Response:

    ```json
    {
        "msg": "Cat Deleted Successfully"
    }
    ```


---
* ### Get Cat Recommendation ###
  URL Cat Recommendation Route: `http://127.0.0.1:3000/UserInterestRecommend/`

* **[POST]** Send User Interest Data 

    Request: 
    ```json
    {
        "documentId": "aGRboE9bkU0gVOvODhmE"
    }
    ```
    Response:
    ```json
    {
        "Recommended Cat IDs":
        [
            0,
            13,
            04,
            03,
            24,
            09
        ]
    }
    ```


### Cloud Computing Member:
- Ade Rizal Pambudi
- Akbar Ihsanul Ahadin

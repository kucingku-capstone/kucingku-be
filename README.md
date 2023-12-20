# KucingKu-Bangkit-Cloud-Computing-Team

This is Repository for KucingKu APP Backend,
This Contains what Cloud Computing's Team Do


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
      "shelterCats": [
            {
                "id": "kCKQAHrzUHfQ6tBI5HdT",
                "cat_Breeds": [
                    "Persian",
                    "Coon",
                    "Siamese"
                    ],
                "cat_Activity": [
                    "Playful",
                    "Communication"
                    ],
                "cat_Color": [
                    "Brown",
                    "Orange",
                    "Grey"
                    ],
                "cat_Fur": [
                    "Short",
                    "Long"
                    ],
                "cat_FurTexture": "Smooth & Soft",
                "cat_UndercoatPattern": "Color Combination"
            },
        ]
    }
    ```

* **[GET]** Get Specific User Interest Data
  
    Additional Route: `<:id>`

    Response:
    ```json
    {
        "id": "tBI5HdTkCKQAHrzUHfQ6",
        "cat_Breeds": [
            "Maine",
            "British Shorthair"
            ],
        "cat_Activity": [
            "Hunting",
            "Sleeping"
            ],
        "cat_Color": [
            "White",
            "Black",
            "Cream"
            ],
        "cat_Fur": "Medium",
        "cat_FurTexture": "Coarse or Curly",
        "cat_UndercoatPattern": "One Color without a Specific Pattern"
    }
    ```

* **[POST]** Add New User Interest

    Request: 
    ```json
    {
        "cat_Breeds": ["Persian", "Coon", "Siamese"],
        "cat_Activity": ["Playful", "Communication"],
        "cat_Color": ["Brown", "Orange", "Grey"],
        "cat_Fur": ["Short", "Long"],
        "cat_FurTexture": "Smooth & Soft",
        "cat_UndercoatPattern": "Color Combination"
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
        "cat_Breeds": "string" or ["array"],
        "cat_Activity": "string" or ["array"],
        "cat_Color": "string" or ["array"],
        "cat_Fur": "string" or ["array"],
        "cat_FurTexture": "string" or ["array"],
        "cat_UndercoatPattern": "string" or ["array"]
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
                "id": "ONSP4lW618g0runtgU5E",
                "name": "Kitty",
                "age": "Baby",
                "gender": "Female",
                "size": "Small",
                "coat": "Short",
                "breed": "Persian",
                "description": "Kitty is a heartwarming feline that captures hearts with her affection.",
                "image": "2a40c80f5cdd787266b94e999ba82f9c.jpg",
                "url": "http://127.0.0.1:3000/images/2a40c80f5cdd787266b94e999ba82f9c.jpg"
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
        "id": "U5EONSP4lW618g0runtg",
        "name": "Kitty",
        "age": "Baby",
        "gender": "Female",
        "size": "Small",
        "coat": "Short",
        "breed": "Persian",
        "description": "Kitty is a heartwarming feline that captures hearts with her affection.",
        "image": "2a40c80f5cdd787266b94e999ba82f9c.jpg",
        "url": "http://127.0.0.1:3000/images/2a40c80f5cdd787266b94e999ba82f9c.jpg"
    }
    ```

* **[POST]** Add New Cat 

    Request: 
    ```json
    {
        "name": "string",
        "age": "string",
        "gender": "string",
        "size": "string",
        "coat": "string",
        "breed": "string",
        "description": "string",
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
        "name": "string",
        "age": "string",
        "gender": "string",
        "size": "string",
        "coat": "string",
        "breed": "string",
        "description": "string",
        "image": "file" //Optional
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


### Cloud Computing Member:
- Ade Rizal Pambudi
- Akbar Ihsanul Ahadin


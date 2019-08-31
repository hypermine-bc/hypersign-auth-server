## POST localhost:3000/appRegister

Request : 

```json
{
	"data": {
            "attributes": {
              "userName": "vishwas",
              "userEmail": "vishu.anand1@gmail.com",
              "companyId": 21,
              "publicToken": "asdf",
              "other": "erfghjkl45678"
            }
        	}
}
```
Response : 

```json
{
    "links": {},
    "data": [
        {
            "attributes": {
                "data": {
                    "_id": "5d6a1975b829860b11d85e43",
                    "userName": "vishwas",
                    "userEmail": "vishu.anand1@gmail.com",
                    "companyId": 21,
                    "publicToken": "asdf",
                    "other": "erfghjkl45678",
                    "createdAt": "2019-08-31T06:53:41.551Z",
                    "updatedAt": "2019-08-31T06:53:41.551Z"
                },
                "message": "Sucessfully Registered"
            },
            "relationships": {}
        }
    ],
    "meta": {},
    "includes": []
}

```

## POST localhost:3000/appLogin

Request: 

```json
{
  "data": {
    "attributes": {
      "companyId": 21,
      "signedRsv": "signed rsv",
      "publicToken": "asdf",
      "rawMsg": "rawMsg"
    }
  }
}

```

Response:

```json
{
  "links": {},
  "data": [
      {
          "relationships": {}
      }
  ],
  "meta": {},
  "includes": []
}
```
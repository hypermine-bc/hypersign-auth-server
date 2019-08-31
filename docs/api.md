## POST localhost:3000/appRegister

Request : 

```json
{
  "companyId": "playground",
  "publicKey": "GCHFLNLH2KAYWKWX3P6RUV6ZOBIRNH7D3BVQGUYJ5JYGHO2EN736SQCG"
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
                  "_id": "5d6a28490734b332a1c7b5ef",
                  "companyId": "playground",
                  "publicKey": "GCHFLNLH2KAYWKWX3P6RUV6ZOBIRNH7D3BVQGUYJ5JYGHO2EN736SQCG",
                  "createdAt": "2019-08-31T07:56:57.519Z",
                  "updatedAt": "2019-08-31T07:56:57.519Z"
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
  "companyId": "playground",
  "publicKey": "GCHFLNLH2KAYWKWX3P6RUV6ZOBIRNH7D3BVQGUYJ5JYGHO2EN736SQCG",
  "signedRsv": "signed rsv",
  "rawMsg": "rawMsg"
}
```

Response:

```json
{
  "links": {},
  "data": [
      {
          "attributes": {
              "data": {},
              "message": "TypeError: Cannot read property 'data' of undefined"
          },
          "relationships": {}
      }
  ],
  "meta": {},
  "includes": []
}
```

## POST localhost:3000/challange

```js
{
  "kcSessionId": "$KCSESSIONID",
  "companyId": "playground"
}

```

Response: 

```js
{
  
}

```
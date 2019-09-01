## POST localhost:3000/register

Request : 

```json
{
  "companyid": "playground",
  "publickey": "0x4b9ee8840b254bf1ec45df7802585042ac8b7f45"
}
```
Response : 

```json
{
  "data": {
      "_id": "5d6b7489d076a15dbef662e8",
      "companyId": "playground",
      "publicKey": "0x4b9ee8840b254bf1ec45df7802585042ac8b7f45",
      "createdAt": "2019-09-01T07:34:33.795Z",
      "updatedAt": "2019-09-01T07:34:33.795Z"
  },
  "message": "Sucessfully Registered",
  "status": 1
}

```
## POST localhost:3000/challenge

Request : 

```json
{
  "kcSessionId" : "newSessionId",
  "companyId": "playground"
}
```
Response:

```json
{
  "data": {
      "_id": "5d6b7505d076a15dbef662e9",
      "companyId": "playground",
      "publicKey": "",
      "ksSessionId": "newSessionId",
      "challange": "3abb3aa0-cc8b-11e9-b4fb-595776b486cb",
      "isAuth": false,
      "createdAt": "2019-09-01T07:36:37.275Z",
      "updatedAt": "2019-09-01T07:36:37.275Z"
  },
  "message": "Sucessfully session created",
  "status": 1
}
```

## POST localhost:3000/verify

Request: 

```json
{
  "companyId": "playground",
  "publicKey": "0x4b9ee8840b254bf1ec45df7802585042ac8b7f45",
  "signedRsv": "{\"r\":{\"type\":\"Buffer\",\"data\":[252,54,228,125,123,61,165,211,220,106,188,36,132,83,24,198,222,145,14,60,130,34,7,130,242,181,168,104,39,193,139,168]},\"s\":{\"type\":\"Buffer\",\"data\":[6,1,54,181,191,79,237,172,147,118,175,34,9,190,1,74,24,18,44,149,49,111,23,238,72,153,98,207,249,42,167,16]},\"v\":27}",
  "rawMsg": "Quick Brown Fox Jump Over a Lazy Dog",
  "ksSessionId" : "newSessionId",
  "challenge" : "3abb3aa0-cc8b-11e9-b4fb-595776b486cb"
}
```

Response:

```json
{
  "data": {
      "ksSessionId": "newSessionId",
      "publicKey": "0x4b9ee8840b254bf1ec45df7802585042ac8b7f45",
      "companyId": "playground"
  },
  "message": "Valid User",
  "valid": true,
  "status": 1
}
```

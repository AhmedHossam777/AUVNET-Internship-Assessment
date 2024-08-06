```toml
name = 'create-user (1) (1) (1) (1)'
method = 'POST'
url = "http://localhost:5000/users\nhttp://localhost:3000/users"
sortWeight = 5000000
id = '6edce6f8-d08b-423f-b03f-8a8763178e99'

[[headers]]
key = 'Content-Type'
value = 'application/json'

[body]
type = 'JSON'
raw = '''
{
  "username": "ahmed",
  "password": "123456",
  "email": "test@test.com"
}'''
```

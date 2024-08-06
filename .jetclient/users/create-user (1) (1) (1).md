```toml
name = 'create-user (1) (1) (1)'
method = 'GET'
url = "http://localhost:5000/users\nhttp://localhost:3000/users"
sortWeight = 4000000
id = 'f0c318bc-e773-4c89-b8b2-4b4d677283cd'

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

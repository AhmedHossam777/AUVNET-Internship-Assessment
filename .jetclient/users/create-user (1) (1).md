```toml
name = 'create-user (1) (1)'
method = 'POST'
url = "http://localhost:5000/users\nhttp://localhost:3000/users"
sortWeight = 3000000
id = 'be1337eb-1e3e-4b87-8a31-41aed61f5fae'

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

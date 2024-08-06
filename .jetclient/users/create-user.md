```toml
name = 'create-user'
method = 'POST'
url = "http://localhost:5000/users\nhttp://localhost:3000/users"
sortWeight = 1000000
id = 'bbec0e28-1cb0-41f9-bbf8-5e42e005ba7f'

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

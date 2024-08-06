```toml
name = 'get-all-users'
method = 'GET'
url = "http://localhost:5000/users\nhttp://localhost:3000/users"
sortWeight = 2000000
id = '10c6232d-a815-4fdb-a7a9-953feea4458c'

[[headers]]
key = 'Content-Type'
value = 'application/json'

[body]
type = 'JSON'
```

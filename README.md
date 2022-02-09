# blog-list


### Project Description:
- https://fullstackopen.com/en/#course-contents
- Project is based on bloglist exercise in Full Stack Open course.

### Cloud Deployment:
https://nmiquan-helsinki-bloglist.herokuapp.com/

### User:
<pre>
{
  "username": "test",
  "name": "",
  "password": "Test123"
}
</pre>

### Login:
<pre>
{
  "username": "test",
  "password": "Test123"
}
</pre>

### Blog:
<pre>
{  
  "title": "Some title"
  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac nibh eu risus laoreet maximus. Fusce turpis tellus, molestie eu erat in, interdum tincidunt tortor. Ut efficitur, massa in sodales tristique, quam felis euismod magna, eu cursus dolor purus a nunc. Sed malesuada finibus risus. In dapibus diam ac tortor."
}
</pre>

### Routes:
<pre>
POST /api/login
POST /api/users
POST /api/blogs

GET /api/users
GET /api/blogs
GET /api/blogs/{id}

DELETE /api/blogs/{id}

PUT /api/blogs/{id}
PUT /api/blogs/{id}/updateLikes

### Sample requests:
<pre>
curl -X POST https://nmiquan-helsinki-bloglist.herokuapp.com/api/users \
     -H 'Content-Type: application/json' \
     -d '{
          "username": "test",
          "password": "Test123"
        }'

curl -X POST https://nmiquan-helsinki-bloglist.herokuapp.com/api/login \
     -H 'Content-Type: application/json' \
     -d '{
          "username": "test",
          "password": "Test123"
        }'

curl -X POST https://nmiquan-helsinki-bloglist.herokuapp.com/api/blogs \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjYyMDNlMTZkODI5ZDc1MzY1ZTEzYzM3MiIsImlhdCI6MTY0NDQyNDAxMX0.xzuUGgOG9UrpTJdCwz8IlKFjj3n4Ifu4mYRBAGs4hfs' \
     -d '{
          "title": "test api",
          "content": "123 123 123"
        }'
        
curl -X GET https://nmiquan-helsinki-bloglist.herokuapp.com/api/users \
     -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjYyMDNlMTZkODI5ZDc1MzY1ZTEzYzM3MiIsImlhdCI6MTY0NDQyNDAxMX0.xzuUGgOG9UrpTJdCwz8IlKFjj3n4Ifu4mYRBAGs4hfs'
     
curl -X GET https://nmiquan-helsinki-bloglist.herokuapp.com/api/blogs \
     -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjYyMDNlMTZkODI5ZDc1MzY1ZTEzYzM3MiIsImlhdCI6MTY0NDQyNDAxMX0.xzuUGgOG9UrpTJdCwz8IlKFjj3n4Ifu4mYRBAGs4hfs'     
  
curl -X GET https://nmiquan-helsinki-bloglist.herokuapp.com/api/blogs/6203c89b559d5cb061b31791 \
     -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjYyMDNlMTZkODI5ZDc1MzY1ZTEzYzM3MiIsImlhdCI6MTY0NDQyNDAxMX0.xzuUGgOG9UrpTJdCwz8IlKFjj3n4Ifu4mYRBAGs4hfs'  

curl -X PUT https://nmiquan-helsinki-bloglist.herokuapp.com/api/blogs/6203c89b559d5cb061b31791 \
     -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjYyMDNlMTZkODI5ZDc1MzY1ZTEzYzM3MiIsImlhdCI6MTY0NDQyNDAxMX0.xzuUGgOG9UrpTJdCwz8IlKFjj3n4Ifu4mYRBAGs4hfs' \
     -d '{
          "title": "test api",
          "content": "new content"
        }'
        
url -X PUT https://nmiquan-helsinki-bloglist.herokuapp.com/api/blogs/6203c89b559d5cb061b31791/updateLikes \
     -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjYyMDNlMTZkODI5ZDc1MzY1ZTEzYzM3MiIsImlhdCI6MTY0NDQyNDAxMX0.xzuUGgOG9UrpTJdCwz8IlKFjj3n4Ifu4mYRBAGs4hfs' \
   
curl -X DELETE https://nmiquan-helsinki-bloglist.herokuapp.com/api/blogs/6203c89b559d5cb061b31791 \
     -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjYyMDNlMTZkODI5ZDc1MzY1ZTEzYzM3MiIsImlhdCI6MTY0NDQyNDAxMX0.xzuUGgOG9UrpTJdCwz8IlKFjj3n4Ifu4mYRBAGs4hfs'       
</pre>

### Needs Improvement:


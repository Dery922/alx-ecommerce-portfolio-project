const express = require("express")
const app = express();
app.get("/",(request,response) =>{
  res.send("hello world")
})

app.listen(3030, () => {
  console.log("Server started successfully");
})

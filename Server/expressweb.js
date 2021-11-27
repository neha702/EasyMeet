const express=require("express")
const mysql=require("mysql")
const app=express()
const server = require("http").createServer(app);
const ports=3001
app.use(express.json());
app.use(express.urlencoded({
    extended:false
})
);
//Sending information from front to back end
const cors=require("cors");
app.use(cors());
const io = require("socket.io")(server, {
	cors: {
		origin: "*", //Accept access from all origins
		methods: [ "GET", "POST" ]
	}
});
const db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password: "",
    database:"test_db",
    port:"3306"
});

db.connect(function(err)
{
if(err)
    console.log("error in db connection")
else{
  console.log("Connected")
}
});
//After connecting to a socket ,what possible things we can do
io.on("connection", (socket) => {
    //Provide id of the caller to frontend
	socket.emit("me", socket.id);
//broadcast a message when disconnected to frontend
  socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});
  //information about user to call to pass to frontend
	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});
 //information about answering call to pass to frontend
	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});
app.post("/",(req,res)=>
{
    const username=req.body.username;
    const password=req.body.password;
	console.log(req.body);
    db.query("INSERT INTO register (username,password) VALUES (?,?)",
     [username,password],
      (err,result) =>{
        if(err)
        console.log(err);
       else
       {
           console.log(result);
       }
       }
        );
})


 app.post("/login",(req,res)=>
  {
       const username=req.body.username;
    const password=req.body.password;
    db.query("SELECT * FROM register WHERE username=? AND password=?",
    [username,password],
     (err,result) =>{
       if(err)
       {
       res.send({err:err});
       console.log(err)
       }
    if(result.length>0)
       res.send(result);
    else{
        res.send({message:"Incorrect username or password"});
    }
      }
       );
  });

  server.listen(ports, () => console.log(`Server is running on port ${ports}`));
//   app.listen(ports,() => {
//     console.log("Running server");
// });

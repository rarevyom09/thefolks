const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function(req,res){

    const fname = req.body.username;
    const name = req.body.mainname;
    const email = req.body.email;

    const data={
        members:[{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:name
                // EMAIL:
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/2a1298b002";
    const options={
        method:"POST",
        auth:"vyom:a5d6588e7b4c616c7d2f31ccf3ddd5ea-us21"
    }
    
    const request = https.request(url,options,function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/s.html");
        }
        else{
            res.sendFile(__dirname + "/f.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();
});



app.post("/f" , function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
    console.log("lol");
});











//mailchimp api key
//a5d6588e7b4c616c7d2f31ccf3ddd5ea-us21

//list audience id
//2a1298b002
const express = require("express");
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");
const mailGun = require('nodemailer-mailgun-transport');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/views/index.html")
});

app.get("/index.html", function(req, res){
    res.sendFile(__dirname + "/views/index.html")
});

app.get("/profile.html", function(req, res){
    res.sendFile(__dirname + "/views/profile.html");
});

app.get("/resume.html", function(req, res){
    res.sendFile(__dirname + "/views/resume.html");
});

app.get("/portfolio.html", function(req, res){
    res.sendFile(__dirname + "/views/portfolio.html");
});

app.get("/contact.html", function(req, res){
    res.sendFile(__dirname + "/views/contact.html")
});

app.post("/contact", function(req, res) {
    const output = `
        <p>You have a new message</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Subject: ${req.body.subject}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

    const auth = {
        auth: {
            api_key: '0dcc3082037ea6e44e8c599eaa869a8a-90ac0eb7-83865f12',
            domain: 'sandboxfb85b10f19314f8c9fe1ab5bb14cb1ed.mailgun.org'
        },
        
        tls: {
            rejectUnauthorized: false   
        }
    };
    
    const transporter = nodeMailer.createTransport(mailGun(auth));

    const mailOption = {
        from: 'mprofessor143@gmail.com',
        to: 'mohak1802bhal@gmail.com',
        subject: 'contact request',
        text:  'Hello world?',
        html: output
    };
            
    transporter.sendMail(mailOption, function(err, data){
        if (err) {
            console.log(err);
        } else {
            console.log("Message sent: %s", mailOption.messageId);
            console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(mailOption));
        }
    }); 

        res.redirect("/contact.html");
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port , function() {
  console.log("Server started on port 3000");
});
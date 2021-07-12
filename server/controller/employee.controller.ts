import * as jwt from 'jsonwebtoken';
import * as expresJWT from 'express-jwt';

const employeeController = (req,res)=>{
    const _json = [
        {id: 1, name: "Tushar Ghadge", email: "tushar@gmail.com"},
        {id: 2, name: "Rohan Sawant", email: "rohan@yahoo.com"},
        {id: 3, name: "Prasad Jagdale", email: "prasad@rediffmail.com"},
        {id: 4, name: "Aditya Singh", email: "adi.singh@ymail.com"},
        {id: 5, name: "Mitesh Tambe", email: "mitesh@hotmail.com"},
        {id: 6, name: "Mukesh Agicha", email: "m.agicha@gmail.com"},
        {id: 7, name: "Avinash Yejarkar", email: "ayk@gmail.com"},
    ]
    return res.status(200).json(_json);//.json(response);  
}

const login = (req, res) => {
    let response = {
        authenticated: false
    }
    if(req.body.username == "test" && req.body.password == "test"){
        //response.authenticated = true;
        var jwtBearerToken = jwt.sign({userID: req.body.username}, 'app-secret', {expiresIn: '2h'});
        //return res.send({token});
        res.status(200).json({
            idToken: jwtBearerToken, 
            expiresIn: 120
        });
    }
    return res.status(200).json(response);//.json(response);
}

export const main = {
    employeeController : employeeController,
    login : login
}
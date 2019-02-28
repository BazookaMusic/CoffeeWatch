const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')


const server = jsonServer.create()
const router = jsonServer.router('./src/api.json')
var CryptoJS = require("crypto-js");
const ENCRYPT = CryptoJS.HmacSHA256;
const KEY = "test";
const ALGO = CryptoJS.SHA256(KEY)

const userdb = JSON.parse(fs.readFileSync('./mock-authentication/users.json', 'UTF-8'));

server.use(jsonServer.defaults())
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

const SECRET_KEY = 'MOCKBACK'
const expiresIn = '1h'

// Create a token from a payload
function createToken(payload){
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
  }

// Verify the token
function verifyToken(token){
    return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// Check if the user exists in database
  function isAuthenticated({email, password}){
    let index= userdb.users.findIndex(user => user.email === email && ENCRYPT(password,ALGO).toString() === user.password)
    console.log(userdb.users[index])
    if (index != -1)
      return {'authenticated':true,'name':userdb.users[index].name,'id': userdb.users[index].id}
    else return {'authenticated':false,'name':null, 'id': undefined}
  }


server.post('/observatory/api/login', (req, res) => {
    //res.header('Access-Control-Allow-Origin', '*')
    const {email, password} = req.body
    console.log(email)
    console.log(password)
    console.log(ENCRYPT(password,ALGO))
    auth = isAuthenticated({email, password})
    isAuth=auth.authenticated
    username=auth.name
    id = auth.id
    if (isAuth === false) {
      const status = 401
      const message = 'Incorrect email or password'
      res.status(status).json({status, message})
      return
    }
    const access_token = createToken({email,username,id})
    //res.header('Access-Control-Allow-Origin', '*')
    res.status(200).json({access_token})
  })

  


  server.post('/observatory/api/register',  (req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*')
    try
    {
      console.log(req.body)
      const {id,name, email,password} = req.body
      if (name === undefined || email === undefined || password === undefined )
      {
        res.status(400).json({message:'Bad request'})
        return
      }

      let index= userdb.users.findIndex(user => user.email === email)
      let index2= userdb.users.findIndex(user => user.name === name)
      
      if (index != -1 || index2 != -1)
      {
        var err_mess = ''
        if (index !== -1)
        {
          err_mess = 'Email already exists'
        }
        else if (index2 !== -1)
        {
          err_mess = 'User already exists'
        }

        res.status(400).json({message: err_mess})
      }
      else
      {
        var maxID=Math.max(...userdb.users.map(user => +user.id)) + 1
        console.log(Math.max(...userdb.users.map(user => +user.id)) + 1)
        
        console.log('adding '+ email)
        const user = {'id':maxID,'name':name,'email':email,'password':ENCRYPT(password,ALGO).toString()}
        userdb.users.push(user)
        fs.writeFileSync('./mock-authentication/users.json', JSON.stringify(userdb),'UTF-8')
        res.status(200).json(user)
      }

    }
    catch(err)
    {
      console.log(err)
      res.status(400).json({message:'Bad request'})
    }
   })
 
 



  


  server.post('/observatory/api/*',  (req, res, next) => {
    for (var propname in req.headers)
    {
      console.log(propname)
    }
   // res.header('Access-Control-Allow-Origin', '*')
    if (req.headers['x-observatory-auth'] === undefined) {
      console.log('HEADER ' + req.headers['x-observatory-auth'])
      const status = 401
      const message = 'Bad authorization header'
      res.status(status).json({status, message})
      return
    }
    try {
       verifyToken(req.headers['x-observatory-auth'])
       next()
    } catch (err) {
      const status = 401
      const message = 'Error: access_token is not valid'
      //res.header('Access-Control-Allow-Origin', '*')
      res.status(status).json({status, message})
    }
  })



  server.put('/observatory/api/*',  (req, res, next) => {
   // res.header('Access-Control-Allow-Origin', '*')
    if ( req.headers['x-observatory-auth'] === undefined) {
      console.log(req.headers['x-observatory-auth'])
      const status = 401
      const message = 'Bad authorization header'
      res.status(status).json({status, message})
      return
    }
    try {
       verifyToken( req.headers['x-observatory-auth'])
       next()
    } catch (err) {
      const status = 401
      const message = 'Error: access_token is not valid'
      //res.header('Access-Control-Allow-Origin', '*')
      res.status(status).json({status, message})
    }
  })

  server.use(router)
  server.use('/observatory/api', router);

  server.listen(8765, () => {
    console.log('Run Auth API Server')
  })

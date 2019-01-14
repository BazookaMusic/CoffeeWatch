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
      return {'authenticated':true,'name':userdb.users[index].name}
    else return {'authenticated':false,'name':null}
  }


server.post('/login', (req, res) => {
    //res.header('Access-Control-Allow-Origin', '*')
    const {email, password} = req.body
    console.log(email)
    console.log(password)
    console.log(ENCRYPT(password,ALGO))
    auth = isAuthenticated({email, password})
    isAuth=auth.authenticated
    username=auth.name
    if (isAuth === false) {
      const status = 401
      const message = 'Incorrect email or password'
      res.status(status).json({status, message})
      return
    }
    const access_token = createToken({email, password,username})
    //res.header('Access-Control-Allow-Origin', '*')
    res.status(200).json({access_token})
  })


  server.use(/^(?!\/auth).*$/,  (req, res, next) => {
   // res.header('Access-Control-Allow-Origin', '*')
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
      console.log(req.headers.authorization)
      const status = 401
      const message = 'Bad authorization header'
      res.status(status).json({status, message})
      return
    }
    try {
       verifyToken(req.headers.authorization.split(' ')[1])
       next()
    } catch (err) {
      const status = 401
      const message = 'Error: access_token is not valid'
      //res.header('Access-Control-Allow-Origin', '*')
      res.status(status).json({status, message})
    }
  })

  server.use(router)
  server.use('/api', router);

  server.listen(8765, () => {
    console.log('Run Auth API Server')
  })

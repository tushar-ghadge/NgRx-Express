import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';


import routes from './routes';


class App {
  public app: express.Application;
  public port = '8080'
  constructor () {
    this.app = express();   

    this.app.use(bodyParser.json({ extended: true }));

    this.app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    //this.app.use(expresJWT({secret: 'app-secret'}).unless({path: ['/api/auth','/','/login']}));
    //this.app.use("/api/getEmpList",expresJWT({secret: 'app-secret'}));
    

    this.app.get('/health', (req, res) => {
        res.json({
            msg: 'online'
        });
    });
    
    this.app.listen(this.port, async (err) => {
        if (err) { 
            return console.log(err)
        }
        return console.log(`server is listening on ${this.port}`)
    });
    this.app.use(routes);
  }
}

export default new App().app;
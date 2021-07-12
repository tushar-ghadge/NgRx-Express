import * as express from 'express';
import controller from '../controller';
import * as expresJWT from 'express-jwt';
const router = express.Router();

const checkIfAuthenticated = expresJWT({secret: 'app-secret'});

router.get("/getEmpList", checkIfAuthenticated ,controller.employeeController.main.employeeController);

router.post("/auth",controller.employeeController.main.login);

export default router;

import * as express from 'express';
import controller from '../controller';
const router = express.Router();

router.get("/getEmpList", controller.employeeController.main.employeeController)

export default router;

import * as express from 'express';
import * as path from 'path';
import routers from './routers';

const angular = {
    path: '../client/dist/client/index.html',
    distPath: '../client/dist/client/'
}

const router = express.Router();




router.use('/api', routers.apiRouter);

router.use(express.static(path.join(__dirname, angular.distPath)));

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, angular.path));
});




export default router;
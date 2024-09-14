import express from 'express';
import { addJob, getJobs,editJob,deleteJob } from '../controllers/userController.js';

const router=express.Router();

router.get('/',getJobs);
router.post('/addJob',addJob);
router.put('/edit/:id',editJob);
router.delete('/delete/:id',deleteJob);


export default router;
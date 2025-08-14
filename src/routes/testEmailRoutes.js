import express from 'express';
import {sendTestEmail} from '../controllers/testEmailControlle.js';

const router = express.Router();

router.post('/send-test-email', sendTestEmail);

export default router;

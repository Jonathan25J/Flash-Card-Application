import { Router } from 'express';
const router = Router()

router.get('/', (req, res) => {
    res.render('practice.html')
})

export default router
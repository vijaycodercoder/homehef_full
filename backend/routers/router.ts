// router.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/subCategories', async (req, res) => {
    try {
        const subCategories = await prisma.sub_categories.findMany();
        res.json(subCategories);
    } catch (error) {
        console.error('Error in /categories endpoint:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/getFoodList', async (req, res) => {
    console.log('req', req)
    // try {
    //     const subCategories = await prisma.sub_categories.findMany();
    //     res.json(subCategories);
    // } catch (error) {
    //     console.error('Error in /categories endpoint:', error);
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
});

export default router;

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

router.post('/getFoodList', async (req: any, res) => {
    console.log(req.body)
    try {
        const foodList = await prisma.items.findMany({
            where: {
                sub_category_id: req.body.id
            }
        });
        res.json(foodList);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;

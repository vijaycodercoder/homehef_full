// router.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/subCategories', async (req, res) => {
    try {
        const subCategories = await prisma.sub_categories.findMany();
        res.json(subCategories);
        // console.log(subCategories)
    } catch (error) {
        console.error('Error in /categories endpoint:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/getFoodList', async (req: any, res) => {
    // console.log(req.body)
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


router.post('/getorderSummary', async (req: any, res) => {
    console.log('getorderSummary', req.body);
    try {
        const request = req.body.data;
        const responseData: any = [];

        await Promise.all(request.map(async (item: any) => {
            const orderSum = await prisma.items.findMany({
                where: {
                    id: item.foodId
                },
                select: {
                    food_type_id: true,
                    id: true,
                    image: true,
                    name: true,
                    price: true,
                }
            });

            const { food_type_id, id, image, name, price } = orderSum[0];
            const totalPrice = price * item.quantity;
            const foodId = id;

            responseData.push({ food_type_id, foodId, image, name, price, quantity: item.quantity, totalPrice });

        }));



        res.json(responseData);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;

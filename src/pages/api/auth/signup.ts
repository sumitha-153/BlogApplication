
// pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb'; 

console.log('API signup');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        console.log('Request body:', req.body);
        
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        try {
            const db = await connectToDatabase();
            const database = db.db(); // Access the database
            const existingUser = await database.collection('users').findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }
            await database.collection('users').insertOne({
                email,
                password,
            });

            return res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error during signup:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}


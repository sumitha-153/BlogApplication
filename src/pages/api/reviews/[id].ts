import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb'; 
import cors, { runMiddleware } from '../../../utils/cors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors); 
  const { method } = req;
  const { id } = req.query;

  const db = await connectToDatabase();
  const database = db.db('BlogApplication');
  const collection = database.collection('reviews'); // Assuming you have a 'reviews' collection

  if (method === 'GET') {
    try {
      const reviews = await collection.find({ blogId: id }).toArray(); // Fetch reviews for the specific blog
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (method === 'POST') {
    try {
      const { review } = req.body;
      const newReview = { blogId: id, review, createdAt: new Date() };
      await collection.insertOne(newReview); // Insert the new review
      res.status(201).json(newReview);
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler; 
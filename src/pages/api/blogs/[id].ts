import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb'; // Adjust the path if necessary

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      const db = await connectToDatabase();
      const database = db.db('BlogApplication');
      const blog = await database.collection('blogs').findOne({ id: parseInt(id as string) });

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      res.status(200).json(blog);
    } catch (error) {
      console.error('Error fetching blog:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler; 
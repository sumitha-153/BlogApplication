import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { connectToDatabase } from '../../utils/mongodb';
// Disable Next.js body parser to handle the form data with formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

console.log("entered into api/blogs.ts");

interface Blog {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  tags: string[];
  profileImage: string;
  blogImage: string;
}

 const handler =async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("entered into handler");
  
  if (req.method === 'GET') {
    try {
      const db = await connectToDatabase();
      const database = db.db('BlogApplication'); // Replace 'yourDatabaseName' with the actual database name
      const blogs = await database.collection('blogs').find().toArray();
      res.status(200).json(blogs);
    } catch (error) {
      console.error('Error fetching blogs from database:', error);
      res.status(500).json({ error: 'Error fetching blogs from database' });
    }
  }
  else if (req.method === 'POST') {
    console.log("before formidable");

    const form = formidable();

    form.parse(req, async (err: Error | null, fields: { title: string; author: string; date: string; content: string; tags: string; }, files: { profileImage: formidable.File[]; blogImage: formidable.File[]; }) => {
      if (err) {
        console.log('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      const { title, author, date, content, tags } = fields;
      const profileImage = Array.isArray(files.profileImage) ? files.profileImage[0] : files.profileImage; // Uploaded profile image
      const blogImage = Array.isArray(files.blogImage) ? files.blogImage[0] : files.blogImage; // Uploaded blog image

      console.log('Form fields:', fields);
      console.log('Form files:', files);

      // Validation: Check for required fields
      if (!title || !author || !date || !content || !tags || !profileImage || !blogImage) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Process images if necessary (e.g., save them to the filesystem or cloud storage)
      // Example:
      const profileImagePath = saveImage(profileImage as formidable.File);
      const blogImagePath = saveImage(blogImage as formidable.File);

      // Create a new blog post
      console.log(typeof(tags));
      console.log(tags);
      const db = await connectToDatabase();
      const database = db.db('BlogApplication');

      const lastBlog = await database.collection('blogs').find().sort({ id: -1 }).limit(1).toArray();
      const newId = lastBlog.length > 0 ? lastBlog[0].id + 1 : 1;
  
      
      
<<<<<<< HEAD
        const newBlog: Blog = {
        id: newId, 
        title: Array.isArray(title) ? title[0] : title as string,
        author: Array.isArray(author) ? author[0] : author as string,
        date: Array.isArray(date) ? date[0] : date as string,
        content: Array.isArray(content) ? content[0] : content as string,
        tags: Array.isArray(tags) ? tags : (tags as string).split(',').map(tag => tag.trim()), // Convert comma-separated tags into an array
        profileImage: profileImagePath, // Save the file path or URL
        blogImage: blogImagePath,
      };
      const result = await database.collection('blogs').insertOne(newBlog);
      console.log(result);


      console.log(newBlog);
      console.log(newBlog.tags);
      
=======
      const newBlog: Blog = {
        id: blogs.length + 1, // Assign a new id
        title: Array.isArray(title) ? title[0] : title,
        author: Array.isArray(author) ? author[0] : author,
        date: Array.isArray(date) ? date[0] : date,
        content: Array.isArray(content) ? content[0] : content,
        tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()), // Convert comma-separated tags into an array
        profileImage: profileImagePath, // Save the file path or URL
        blogImage: blogImagePath,
      };      
>>>>>>> 6787ee5820f8428e6444f47051e8496dc379c522


      

      // Respond with the newly created blog post
      return res.status(201).json(newBlog);
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Helper function to save image (can be customized for local storage or cloud)
const saveImage = (file: formidable.File): string => {
  const data = fs.readFileSync(file.filepath);
  const filePath = `/uploads/${file.newFilename}`; // Define path
  fs.writeFileSync(`./public${filePath}`, data); // Save the file in the public folder
  return filePath; // Return the file path to use in the blog post
};

export default handler
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../navbar/Navbar';
import styles from './blog.module.css';
import { GetServerSideProps } from 'next';
import Footer from '../footer/Footer';
import Image from 'next/image';
import BlogDetails from './[id]';

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


interface BlogsProps {
  blogs:Blog[];
}


const Blogs = ({ blogs }: BlogsProps) => {
  const router = useRouter();
  const { query } = router;
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);



  useEffect(() => {
    if (query.id) {
      const foundBlog = blogs.find((b) => b.id === parseInt(query.id as string));
      setSelectedBlog(foundBlog || null);
    }
  }, [query, blogs]);

  


  const handleReadMore = (blog: Blog) => {
    router.push(`/blogs/${blog.id}`);
  };

  return (
    <div>
      <Navbar>
      
      {selectedBlog ? (
        <BlogDetails />
      ) : (
        <ul className={styles.blogcard}>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <div style={{display:'flex' ,flexDirection:'row' , gap:'10px'}}>
              <Image className={styles.image} src={blog.profileImage} alt={`${blog.author}'s profile`}  width={40} height={40}/>
               <p> By {blog.author} on {blog.date}</p>
               

              </div> <hr /> <br />
             
               
               <Image className={styles.blogimage} src={blog.blogImage} alt={`${blog.title}`}  width={400} height={400}/>

               <br />
              <div className={styles.container}>
               <h2 className={styles.title}> {blog.title}</h2>
                <p>Tags: {blog.tags.join(', ')}</p>

                <button 
                  onClick={() => handleReadMore(blog)}    
                  className={styles.buttons}              
                >
                  Read more...
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      </Navbar>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/blogs`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.statusText}`);
    }
    
    const blogs: Blog[] = await res.json();

    return {
      props: { blogs },
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      props: { blogs: [] },
    };
  }
};


export default Blogs;






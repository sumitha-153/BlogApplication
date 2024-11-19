import React, { useState } from 'react';
import styles from './write.module.css';
import { useRouter } from 'next/router';

const Write: React.FC = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [blogImage, setBlogImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<{
        title: string;
        author: string;
        date: string;
        content: string;
        tags: string[];
        profileImage: string;
        blogImage: string;
    }>({
        title: '',
        author: '',
        date: '',
        content: '',
        tags: [],
        profileImage: '',
        blogImage: ''
    });

    const validateForm = () => {
        const newErrors: {
            title: string;
            author: string;
            date: string;
            content: string;
            tags: string[];
            profileImage: string;
            blogImage: string;
        } = {
            title: '',
            author: '',
            date: '',
            content: '',
            tags: [],
            profileImage: '',
            blogImage: '',
        };

        // Check for validation errors
        if (!title) newErrors.title = 'Title is required';
        if (!author) newErrors.author = 'Author is required';
        if (!date) newErrors.date = 'Date is required';
        if (!content) newErrors.content = 'Content is required';
        if (!tags.length) newErrors.tags = ['At least one tag is required'];
        if (!profileImage) newErrors.profileImage = 'Profile image is required';
        if (!blogImage) newErrors.blogImage = 'Blog image is required';

        setErrors(newErrors);

        // Log validation errors for debugging
        console.log('Validation Errors:', newErrors);

        // Check if any errors exist
        return Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate the form before submission
        if (!validateForm()) {
            console.log('Form validation failed');
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('date', date);
        formData.append('content', content);
        formData.append('tags', tags.join(','));
        if (profileImage) formData.append('profileImage', profileImage);
        if (blogImage) formData.append('blogImage', blogImage);

        // Log formData values (for debugging)
        console.log('Submitting form with the following data:');
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await fetch('http://localhost:3000/api/blogs', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Form submitted successfully');
                // Redirect after successful submission
                router.push('/blogs/blog');
            } else {
                console.error('Server responded with an error:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleFocus = (field: string) => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.head}>Write a Blog</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label htmlFor='title'>Title:</label>
                    <input
                        className={styles.inputs}
                        id='title'
                        type="text"
                        value={title}
                        placeholder='Give the title about your blog'
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={() => handleFocus('title')}
                    />
                    {errors.title && <span className={styles.error}>{errors.title}</span>}
                </div>
                <div>
                    <label htmlFor='author'>Author:</label>
                    <input
                        className={styles.inputs}
                        id='author'
                        type="text"
                        value={author}
                        placeholder='Authors name goes here!!'
                        onChange={(e) => setAuthor(e.target.value)}
                        onFocus={() => handleFocus('author')}
                    />
                    {errors.author && <span className={styles.error}>{errors.author}</span>}
                </div>
                <div>
                    <label htmlFor='date'>Date:</label>
                    <input
                        className={styles.inputs}
                        id='date'
                        type="date"
                        value={date}
                        placeholder='Blog date'
                        onChange={(e) => setDate(e.target.value)}
                        onFocus={() => handleFocus('date')}
                    />
                    {errors.date && <span className={styles.error}>{errors.date}</span>}
                </div>
                <div>
                    <label htmlFor='content'>Content:</label>
                    <textarea
                        className={styles.textareas}
                        id='content'
                        value={content}
                        placeholder='Type your content.........'
                        onChange={(e) => setContent(e.target.value)}
                        onFocus={() => handleFocus('content')}
                    />
                    {errors.content && <span className={styles.error}>{errors.content}</span>}
                </div>
                <div>
                    <label htmlFor='tags'>Tags:</label>
                    <input
                        className={styles.inputs}
                        id='tags'
                        type="text"
                        value={tags.join(', ')}
                        placeholder='Tags goes here'
                        onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
                        onFocus={() => handleFocus('tags')}
                    />
                    {errors.tags.length > 0 && <span className={styles.error}>{errors.tags.join(', ')}</span>}
                </div>
                <div>
                    <label htmlFor='pimage'>Profile Image:</label>
                    <input
                        className={styles.inputs}
                        id='pimage'
                        type="file"
                        accept="image/*"
                        placeholder='Your profile image'
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setProfileImage(e.target.files[0]);
                            }
                        }}
                        onFocus={() => handleFocus('profileImage')}
                    />
                    {errors.profileImage && <span className={styles.error}>{errors.profileImage}</span>}
                </div>
                <div>
                    <label htmlFor='bimage'>Blog Image:</label>
                    <input
                        className={styles.inputs}
                        id='bimage'
                        type="file"
                        accept="image/*"
                        placeholder='Blog image'
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setBlogImage(e.target.files[0]);
                            }
                        }}
                        onFocus={() => handleFocus('blogImage')}
                    />
                    {errors.blogImage && <span className={styles.error}>{errors.blogImage}</span>}
                </div> <br />
                <button className={styles.buttons} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Write;

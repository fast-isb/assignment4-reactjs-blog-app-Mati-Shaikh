import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BlogsList.css';
import Login from './Login';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [blogsPerPage] = useState(10);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [followedBlogs, setFollowedBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userRatings, setUserRatings] = useState({}); // Track user ratings for each blog
  const [commentText, setCommentText] = useState('');
  const [commentAdded, setCommentAdded] = useState(false);
  // Fetch blog data function
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/posts/getAllPost?page=${currentPage}&limit=${blogsPerPage}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setBlogs(data);
        setTotalPages(1);
      } else if (data.posts) {
        setBlogs(data.posts);
        setTotalPages(data.totalPages);
      } else {
        console.error('Invalid API response format:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      setCurrentPage(parseInt(storedPage, 10));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [currentPage, blogsPerPage]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/posts/search?query=${searchTerm}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      console.log("Meri Marzii");


      if (Array.isArray(data)) {
        setBlogs(data);
        setTotalPages(1);
      } else if (data.posts) {
        setBlogs(data.posts);
        setTotalPages(data.totalPages);
      } else {
        console.error('Invalid API response format:', data);
      }
    } catch (error) {
      console.error('Error searching data:', error);
    }
  };

  const handleUserRating = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/posts/ratePost/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          Rate: userRatings[postId] || 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Blog rated successfully:', data);
      // Fetch updated data after rating
      fetchData();

      // Alert the user
      alert('Blog rated successfully!');
    } catch (error) {
      console.error('Error rating blog:', error);
    }
  };
  const handleAddComment = async () => {
    try {
      let blogId;
  
      // Check if selectedBlog is defined, use its ID; otherwise, use a default or fallback ID
      if (selectedBlog) {
        blogId = selectedBlog._id;
      } else {
        // Use a default or fallback blog ID (replace 'DEFAULT_BLOG_ID' with the actual ID you want to use)
        blogId = 'DEFAULT_BLOG_ID';
      }
  
      const response = await fetch(`http://localhost:5001/api/posts/commentPost/${blogId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          comment: commentText,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log('Comment added successfully:', data);
  
      setCommentText('');
      setCommentAdded(true);
      fetchData();
      alert('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const handleFollow = (blogId) => {
    console.log(`Follow button clicked for blog with ID: ${blogId}`);
    setFollowedBlogs((prevFollowedBlogs) => [...prevFollowedBlogs, blogId]);
  };

  const isFollowed = (blogId) => {
    return followedBlogs.includes(blogId);
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };


  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  return (
    <>
      <Form className="search-bar">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="SearchButton" onClick={handleSearch}>
          Search
        </Button>
      </Form>
  
      <ul className="blog-list">
        {blogs.map((blog) => (
          <li key={blog._id} className="blog-item">
            <h2>
              {blog.title}
              <Button
                variant={isFollowed(blog._id) ? 'light' : 'primary'}
                className="follow-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFollow(blog._id);
                }}
              >
                {isFollowed(blog._id) ? 'Following' : 'Follow'}
              </Button>
            </h2>
            <p>{blog.desc}</p>
            <p className="author">
              <strong>Author:</strong> {blog.author}
            </p>
            <p className="createdAt">
              <strong>Created at:</strong> {blog.createdAt}
            </p>
            <div className="blog-action">
              <Form.Group controlId={`comment_${blog._id}`} className="comment-group">
                <Form.Control
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </Form.Group>
              
              <Button className='CommentButton' onClick={handleAddComment}>
                Add Comment
              </Button>
  
              <Form.Group controlId={`rating_${blog._id}`} className="rating-group">
                <Form.Label>Rate this blog (1-5):</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="5"
                  value={userRatings[blog._id] || 0}
                  onChange={(e) => setUserRatings({ ...userRatings, [blog._id]: e.target.value })}
                />
              </Form.Group>
              <Button variant="success" onClick={() => handleUserRating(blog._id)}>
                Rate
              </Button>
  
              <Button variant="info" onClick={() => handleBlogClick(blog)} className='seemore'>
                See More
              </Button>
            </div>
          </li>
        ))}
      </ul>
  
      <div className="pagination">
        <button className="prev-button" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button className="next-button" onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
  
      {selectedBlog && (
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedBlog.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedBlog.desc}</p>
            <p>
              <strong>Author:</strong> {selectedBlog.author}
            </p>
            <p>
              <strong>Created at:</strong> {selectedBlog.createdAt}
            </p>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
      }

export default BlogList;

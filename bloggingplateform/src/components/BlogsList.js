import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BlogsList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [blogsPerPage] = useState(10);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [followedBlogs, setFollowedBlogs] = useState([]);

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      setCurrentPage(parseInt(storedPage, 10));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/posts/getAllPost?page=${currentPage}&limit=${blogsPerPage}`);
        const data = await response.json();

        setBlogs(data.posts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, blogsPerPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const handleFollow = (blogId) => {
    // Implement the logic to update the follow state for the blog with the given ID
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
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id} onClick={() => handleBlogClick(blog)}>
            <h2>
              {blog.title}
              <Button
                variant={isFollowed(blog._id) ? 'light' : 'primary'} className='follow_button'
                onClick={(e) => {
                  e.stopPropagation(); // Prevent li click event from firing
                  handleFollow(blog._id);
                }}
                style={{ marginLeft: '10px' }}
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
            <Button className='see_more_button' onClick={() => handleBlogClick(blog)}>
              See More
            </Button>
          </li>
        ))}
      </ul>

      <div className='pagination'>
        <button className='prev_button' onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button className='next_button' onClick={nextPage} disabled={currentPage === totalPages}>
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
};

export default BlogList;

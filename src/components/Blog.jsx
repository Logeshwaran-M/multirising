import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase"; // adjust path
import { collection, getDocs } from "firebase/firestore";
import { Card, Button } from "react-bootstrap";

export default function ArecaBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blog"));
        const blogData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-4">Loading blogs...</div>;
  }

  return (
    <div className="container py-4 mt-5" style={{  minHeight: "100vh" }}>
      <h2 className="text-center text-dark mb-4">Our Blogs</h2>

      <div className="row">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-md-4 mb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
             <Card
  className="h-100 shadow"
  style={{
    borderRadius: "12px",
    background: "#2c2c3e",
    color: "#fff"
  }}
>
  <Card.Img
    variant="top"
    src={blog.image}
    style={{ height: "200px", objectFit: "cover" }}
  />

  <Card.Body>
    <Card.Title style={{ color: "#fff" }}>
      {blog.heading}
    </Card.Title>

    <Card.Text style={{ fontSize: "14px", color: "#ccc" }}>
      {blog.description?.slice(0, 120)}...
    </Card.Text>

  
  </Card.Body>
</Card>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

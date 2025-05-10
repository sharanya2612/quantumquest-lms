import React, { useState, useEffect } from 'react';
import {
  Modal, Box, Typography, TextField, Button, IconButton
} from '@mui/material';
import axios from 'axios';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxWidth: '90%', 
    width: 'auto',
    overflowY: 'auto', 
    maxHeight: '90vh', 
  };
  

const EditCourseModal = ({ open, onClose, courseId }) => {
  const [course, setCourse] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (courseId) {
      axios.get(`http://localhost:3001/courses/${courseId}`)
        .then((res) => {
          setCourse(res.data);
          setImagePreview(res.data.image);
        })
        .catch((err) => console.error('Error loading course:', err));
    }
  }, [courseId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageFile(reader.result); // use base64 string
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image (JPG, JPEG, PNG).');
    }
  };

  const handleSubmit = async () => {
    if (!course.title || !course.subtitle || !course.description) {
      alert('Please fill in all required fields.');
      return;
    }

    const updatedCourse = {
      ...course,
      image: imageFile || imagePreview,
      price: course.price.startsWith('$') ? course.price : `$${course.price}`
    };

    try {
      await axios.put(`http://localhost:3001/courses/${courseId}`, updatedCourse);
      alert('Course updated successfully!');
      onClose();
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update course.');
    }
  };

  if (!course) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle, width: 500 }}>
        <Typography variant="h6" mb={2}>Edit Course</Typography>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={course.title}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
        />
        <TextField
          label="Subtitle"
          fullWidth
          margin="normal"
          value={course.subtitle}
          onChange={(e) => setCourse({ ...course, subtitle: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          minRows={3}
          value={course.description}
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
        />
        <TextField
          label="Students"
          fullWidth
          margin="normal"
          value={course.students}
          onChange={(e) => setCourse({ ...course, students: e.target.value })}
        />
        <TextField
          label="Reviews"
          fullWidth
          margin="normal"
          value={course.reviews}
          onChange={(e) => setCourse({ ...course, reviews: e.target.value })}
        />
        <TextField
          label="Price"
          fullWidth
          margin="normal"
          value={course.price.startsWith('$') ? course.price.slice(1) : course.price}
          onChange={(e) => setCourse({ ...course, price: e.target.value })}
          InputProps={{
            startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
          }}
        />

        <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>

        {imagePreview && (
          <Box mt={2}>
            <img src={imagePreview} alt="Preview" style={{ width: '100%', borderRadius: 4 }} />
          </Box>
        )}

        <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleSubmit}>
          Update Course
        </Button>
      </Box>
    </Modal>
  );
};

export default EditCourseModal;

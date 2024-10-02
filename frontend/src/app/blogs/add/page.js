"use client";
import { Box, Button, Container, Input, TextareaAutosize, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import axios from "axios";

export default function AddBlog(){
    const [blogTitle, setBlotTitle] = useState('');
    const [blogDescription, setBlogDescription] = useState('');
    const [image, setImage] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", blogTitle);
        formData.append("description", blogDescription);
        formData.append("categorie_id", 6);
        formData.append("image", image);


        try {
            // Post request to your Laravel backend
            const response = await axios.post('http://localhost:8000/api/blogs', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            
            console.log('Response:', response.data);
            alert('Form submitted successfully');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }


    return(
        <Container sx={{textAlign: "center"}} >
            <Typography fontSize={22} fontWeight={600} sx={{margin: "20px 0 40px"}}>
                Create a new Blog
            </Typography>
            <Box component={'form'} onSubmit={handleSubmit} >

                <Input autoFocus color="primary" placeholder="blog title" required onChange={(e) => setBlotTitle(e.target.value)} />
                <Input multiline minRows={6} disableUnderline placeholder="type what are you thing of" onChange={(e) => setBlogDescription(e.target.value)} sx={{
                    marginTop: 7,
                    marginBottom: 5,
                    borderLeft: "1px solid #ddd",
                    borderBottom: "1px solid #ddd",
                    borderRight: "1px solid #ddd",
                    padding: 3,
                    display: "block",
                    fontSize: 14,
                }} />
                <input type="file" accept="image/*" onChange={(e) => {setImage(e.target.files[0])}} required />
                <Button type="submit" color="secondary" variant="contained" sx={{fontSize: 12}} >
                    Publish
                </Button>
            </Box>
            
        </Container>
    )
}
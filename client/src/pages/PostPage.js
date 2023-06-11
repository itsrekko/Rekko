import React from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import Post from "../components/Post/Post";
import MorePostsFromUser from "../components/Post/MorePostsFromUser";

function PostPage() {
    const { postId } = useParams();
    console.log('Post page')

    return (
        <Box sx={{justifyContent: 'center', alignItems: 'center'}}>
            <Post id={postId} />
            {/* <MorePostsFromUser /> */}
        </Box>
    );
}

export default PostPage;
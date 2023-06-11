import React from "react";
import Modal from '@mui/material/Modal';
import { useParams, useNavigate } from "react-router-dom";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { makeStyles } from "@mui/styles";
import Post from "./Post";

function PostModal() {
    const usePostModalStyles = makeStyles(theme => ({
        overlay: {
          position: "fixed !important",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5) !important",
          zIndex: "1200 !important",
          padding: "0 40px !important",
          pointerEvents: "auto"
        },
        close: {
          padding: 12,
          top: 0,
          right: 0,
          position: "fixed",
          zIndex: 1201,
          cursor: "pointer"
        }
      }));
    const classes = usePostModalStyles();
    
    const navigate = useNavigate()
    const { postId } = useParams();

    return (
        <>
        <Modal
            isOpen
            ariaHideApp={false}
            overlayClassName={classes.overlay}
            onRequestClose={() => navigate(-1)}
            style={{
            content: {
                display: "flex",
                alignItems: "center",
                maxWidth: 935,
                width: "100%",
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                transform: "translate(-50%, -50%)",
                margin: 0,
                padding: 0,
                overflow: "none",
                WebkitOverflowScrolling: "touch"
            }
            }}
        >
            <Post id={postId} />
        </Modal>
        <div onClick={() => navigate(-1)} className={classes.close}>
            <CloseOutlinedIcon />
        </div>
        </>
    );
}

export default PostModal;
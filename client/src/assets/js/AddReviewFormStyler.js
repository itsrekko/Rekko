import { alignProperty } from "@mui/material/styles/cssUtils";

export const AddReviewFormStyler = () => ({
    card: {
        height: "fitContent",
        width: "710px",
        "@media (max-width: 768px)": { width: "78vw" },
        backgroundColor: "#FFFFFF",
        borderRadius: '25px'
    },
    customTitle: {
        color: '#6C5B57',
        paddingTop: '32px',
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    customSpacing: {
        marginBottom: '20px',
        minHeight: '56px',
    },
    root: {
        flexGrow: 1,
    }
});
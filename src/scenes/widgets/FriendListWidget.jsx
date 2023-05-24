import { Box,Typography,useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setFriends } from "../../state";

const FriendListWidget=({userId})=>{
    const {palette}=useTheme();
    const dispatch=useDispatch();
    const token = useSelector((state)=>state.token);
    const friends = useSelector((state)=>state.user.friends);
    const primaryLight=palette.primary.light;
    const primaryDark=palette.primary.dark;
    const main=palette.neutral.main;
    const medium=palette.neutral.medium;
   
}

export default FriendListWidget;
import { Box,Typography,useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setFriends } from "../../state";
import axios from "axios";

const FriendListWidget=({userId})=>{
    const {palette}=useTheme();
    const dispatch=useDispatch();
    const token = useSelector((state)=>state.token);
    const friends = useSelector((state)=>state.user.friends);
    const primaryLight=palette.primary.light;
    const primaryDark=palette.primary.dark;
    const main=palette.neutral.main;
    const medium=palette.neutral.medium;
    const getFriends = async () => {
        try {
            console.log("first")
          const response = await axios.get(
            `http://localhost:8080/users/${userId}/friends`,
            {
              headers: { Authorization: `Barrer ${token}` },
            }
          );
          console.log("response", response);
          const data = await response.data;
          dispatch(setFriends({friends:response.data}))
        } catch (error) {
          console.log(error);
        }
};

useEffect(()=>{
    getFriends();

},[]);

return(
<WidgetWrapper>
    <Typography
    color={palette.neutral.dark}
    variant="h5"
    fontWeight="500"
    sx={{
        mb:"1.5rem"

    }}
    >
        Friends List
    </Typography>

    <Box
    display="flex" 
    flexDirection="column"
    gap="1.5rem"
    >
        {friends.map((friend)=>(
            <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
           />
        ))}

    </Box>
</WidgetWrapper>

)

}

export default FriendListWidget;

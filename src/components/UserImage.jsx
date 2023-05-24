import { Box } from "@mui/material";

const UserImage =({image,size="60px"})=>{
    return (
        <Box width={size} hieght={size}>
          <img style={{objectFit:"cover",borderRadius:"50%"}}
    width={size}
    hieght={size}
    alt="user"
    src={`/Assets/${image}`}

          />  
        </Box>
    )
}
export default UserImage;
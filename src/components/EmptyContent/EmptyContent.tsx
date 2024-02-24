import { Box, IconButton, Typography } from "@mui/material";
 

interface Props {
  icon?: React.ReactNode;
  header?: string;
  message?: string;
}
 
const EmptyContent: React.FC<Props> = ({ icon, header, message }) => {
 
  
  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} py={10}>
      <IconButton
        sx={{
          width: 120,
          height: 120,         
          background: '#EDF4FE',           
        }}
      >
        {icon!}
        
      </IconButton>
      <Typography variant="h4" sx={{ fontWeight: 700 }} paragraph>
        {header!}        
      </Typography>
      <Typography variant="body1" sx={{
        fontWeight: 400,
        color: '#7A7A7A',
        maxWidth: 800
      }} paragraph>
        {message!}
        
      </Typography>
    </Box>
  );
};

export default EmptyContent;

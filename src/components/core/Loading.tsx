import { Box, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box
      w="full"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner color="teal.500" animationDuration="0.8s" />
    </Box>
  );
};

export default Loading;

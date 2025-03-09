import { Box, Flex, Skeleton, Spinner } from "@chakra-ui/react";

const Loading = ({ type = "spinner" }: { type: "spinner" | "skeleton" }) => {
  return type === "spinner" ? (
    <Box
      w="full"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner color="teal.500" animationDuration="0.8s" />
    </Box>
  ) : (
    <Box p={4}>
      {/* رأس الجدول */}
      <Flex mb={4} gap={4} fontWeight="bold">
        {Array.from({ length: 5 }).map((_, index) => (
          <Box key={index} flex="1">
            <Skeleton height="20px" width="80px" />
          </Box>
        ))}
      </Flex>

      {/* جسم الجدول */}
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <Flex key={rowIndex} gap={4} mb={3} align="center">
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <Box key={colIndex} flex="1">
              <Skeleton height="16px" width="100%" />
            </Box>
          ))}
        </Flex>
      ))}
    </Box>
  );
};

export default Loading;

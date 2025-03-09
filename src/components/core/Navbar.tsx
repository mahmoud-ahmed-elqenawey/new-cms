import { removeTokens } from "@/services/auth";
import useAuth from "@/store/useAuth";
import { Avatar, Box, Button, Circle, Flex, Float } from "@chakra-ui/react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, user } = useAuth();

  const userName = user?.first_name + " " + user?.last_name;
  return (
    <Box
      bg="white"
      mb="4"
      p="4"
      borderRadius="l1"
      display="flex"
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex align="center" gap="2">
        <Avatar.Root size="lg" variant="outline">
          <Avatar.Fallback name={userName} />
          <Avatar.Image src="https://scontent.fcai19-12.fna.fbcdn.net/v/t39.30808-6/477337398_3947321918918937_8815390351782790006_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=KJbjaSS51AUQ7kNvgGlYEYk&_nc_oc=AdhH0ZkSY8kEEI2I3mcixmPV2XryaDcHir6WA6M1ZCippXWY6W7GFxK7eM0Df65ih2s&_nc_zt=23&_nc_ht=scontent.fcai19-12.fna&_nc_gid=ARU7k3Ptzhth3pkEOxU6vr4&oh=00_AYCPEoNYBzCbFOh9J-gIYEDvrCkmA1tXDdwNzKCVfwS1DQ&oe=67CA08C7" />
          <Float placement="bottom-end" offsetX="1" offsetY="1">
            <Circle
              bg="green.500"
              size="8px"
              outline="0.2em solid"
              outlineColor="bg"
            />
          </Float>
        </Avatar.Root>
        {userName}
      </Flex>
      <Button
        onClick={() => removeTokens(navigate, setIsAuthenticated)}
        variant="subtle"
        colorPalette="red"
        size="sm"
      >
        <LogOut />
        تسجيل الخروج
      </Button>
    </Box>
  );
};

export default Navbar;

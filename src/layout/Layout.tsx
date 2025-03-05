import { Outlet } from "react-router";
import Sidebar from "../components/core/Sidebar";
import { Box } from "@chakra-ui/react";
import Navbar from "@/components/core/Navbar";
import { useCustomQuery } from "@/hooks/useQuery";
import projectApiPathes from "@/utils/projectPathes";
import { useLayoutEffect } from "react";
import useAuth from "@/store/useAuth";

const Layout = () => {
  const { setUser } = useAuth();
  const userData = useCustomQuery(["user"], projectApiPathes.user);

  useLayoutEffect(() => {
    setUser(userData?.data?.data);
  }, [userData.isPending]);

  return (
    <Box minH="100vh" bg="gray.100">
      <Sidebar />

      <Box mr={{ base: 0, md: 60 }} p="4" bg="gray.100" minH="100vh">
        <Navbar />
        <Box bg="white" p="4" minH="100vh" borderRadius="l1">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;

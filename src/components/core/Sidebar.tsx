import {
  Box,
  Flex,
  Text,
  Icon,
  CloseButton,
  useDisclosure,
  DrawerContent,
  BoxProps,
  IconButton,
  FlexProps,
} from "@chakra-ui/react";
import { Book, Users, Package2, Home, Menu } from "lucide-react";
import { NavLink } from "react-router";
import { IconType } from "react-icons";
import { ReactNode } from "react";
import { DrawerRoot } from "../ui/drawer";

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "الرئيسية", icon: Home, url: "/" },
  { name: "دورات التجويد", icon: Book, url: "courses" },
  { name: "الطلاب", icon: Users, url: "students" },
  { name: "الاحصائيات", icon: Book, url: "statistics" },
  { name: "المخزون", icon: Package2, url: "inventory" },
  // { name: "تسجيل الخروج", icon: <LogOut /> },
];

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  url: string;
}
const NavItem = ({ icon, children, url }: NavItemProps) => {
  return (
    <Box asChild py="4" p="2" color="teal" _hover={{ color: "teal.500" }}>
      <NavLink
        to={url}
        style={({ isActive }) => ({
          backgroundColor: isActive ? "#ccfbf1" : "",
        })}
      >
        {icon && <Icon me="2" ms="4" fontSize="16" as={icon} w="20px" />}
        {children}
      </NavLink>
    </Box>
  );
};

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={"white"}
      borderRight="1px"
      borderRightColor={"gray.200"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="gray.200"
        mb="4"
      >
        <Text px="8" py="4" fontSize="xx\" fontWeight="bold">
          لوحة التحكم
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex flexDir="column">
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} url={link.url}>
            {link.name}
          </NavItem>
        ))}
      </Flex>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={"white"}
      borderBottomWidth="1px"
      borderBottomColor={"gray.200"}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu">
        <Menu />
      </IconButton>

      <Text fontSize="2xl" ms="4" fontWeight="bold">
        لوحة التحكم
      </Text>
    </Flex>
  );
};

function Sidebar() {
  const { onOpen, onClose, open } = useDisclosure();

  return (
    <>
      {/* sidebar desktop */}
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      {/* sidebar desktop */}

      <DrawerRoot
        open={open}
        placement="start"
        onOpenChange={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </DrawerRoot>

      {/* mobile navbar */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      {/* mobile navbar */}
    </>
  );
}

export default Sidebar;

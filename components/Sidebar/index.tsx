import React, { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Spacer,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  Image,
  MenuItem,
  MenuList,
  createIcon,
  Button,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { MdHelpOutline } from 'react-icons/md';
import { BsMenuButtonWide } from 'react-icons/bs';
import { FaGamepad } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { useState } from 'react'
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { IoLogOut } from 'react-icons/io5';
import { destroyCookie } from "nookies";
import Router from 'next/router'
interface LinkItemProps {
  name: string;
  icon: IconType;
}


export default function SidebarWithHeader({
  children
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (<>
    <Box minH="100vh" h="100vh" bg={useColorModeValue('gray.100', 'gray.900')} >
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box h="100%" overflow='hidden' overflowX="hidden">
        {children}
      </Box>
    </Box>
  </>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w="100%"
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <HStack>
          <Icon
            ml="1"
            _groupHover={{
              color: 'blue.500',
            }}
            fontSize="24px"
            as={BsMenuButtonWide}
          />
          <Text fontSize="24px"> Menu</Text>
        </HStack>
        <CloseButton onClick={onClose} />
      </Flex>
      <ul>
        <a
          href="#"
        >
          <ul style={{ top: "-5px", left: "3px", width: "200px" }}>
            <HStack mt="15px" spacing="43px" ml="32px">
              <Icon
                ml="1"
                _groupHover={{
                  color: 'blue.500',
                }}
                fontSize="24px"
                as={MdHelpOutline}
              />              <Text>Ajuda</Text>
            </HStack>
          </ul>
        </a>
      </ul>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  function refreshOut() {
    destroyCookie(null, 'jwt_enviroment');
    destroyCookie(null, 'username');
    destroyCookie(null, 'jwt_chat');
    Router.push("/")
  }
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Spacer />
      <Icon as={FaGamepad} boxSize={70} color="#1C1C1C" />
      <Spacer />
      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  name={"name"}
                  src={""}
                />
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem onClick={() => console.log("open")}>
                <HStack>
                  <Image
                    src="./icons/icon-participante.svg"
                  />
                  <Text>Meu Perfil</Text>
                </HStack>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => refreshOut()}>
                <HStack>
                  <Icon
                    as={IoLogOut}
                    fontSize="22px"
                  />
                  <Text>Sair</Text>
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack >
    </Flex >
  );
};
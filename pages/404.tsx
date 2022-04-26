import {
  Box,
  Button,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";

import MotionBox from "../components/MotionBox";

const Page404 = () => {
  return (
    <>
      <Head>
        <title>Pagina não encontrada</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <MotionBox
        animate={{ y: 20, x: 80 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        width={["100%", "70%", "60%", "60%"]}
        margin="0 auto"
      >
        <Image
          src="/404 Error-pana.svg"
          alt="Error 404 not found Illustration"
        />
      </MotionBox>

      <Box marginY={4}>
        <Heading textAlign="center">Pagina não encontrada.</Heading>
      </Box>
    </>
  );
};

export default Page404;

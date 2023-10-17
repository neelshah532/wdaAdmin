import React, { useState } from "react";
// import background from "../images/home_background.jpeg";
import background from "../images/Admin_Background.png";
import logo from "../images/WDAlogo.png";
import axios from "axios";
import UpdateStatus from "../components/UpdateStatus";
import Query from "../components/Query";
import { useToast } from "@chakra-ui/react";
// import QueryView from "../components/QueryView";
import {
  Box,
  Image,
  Text,
  Tabs,
  // TabList,
  // Tab,
  TabPanels,
  TabPanel,
  // TabIndicator,
  Grid,
  Button,
  Input,
  Stack,
} from "@chakra-ui/react";

function Home() {
  const toast = useToast();
  const [validbusinessTemplate, setValidBusinessTemplate] = useState({
    template: "",
    templateImage: "",
  });
  const onChange = (event) => {
    const file = event.target.files[0];
    setValidBusinessTemplate((prevState) => ({
      ...prevState,
      [event.target.name]: file,
    }));
  };

  const templateUpload = async (e) => {
    e.preventDefault();

    const [htmlFileName, htmletn] =
      validbusinessTemplate.template.name.split(".");
    const [gifFileName, gifetn] =
      validbusinessTemplate.templateImage.name.split(".");
    if (htmlFileName != gifFileName) {
      toast({
        title: "HTML and GIF Name Should Be Same",
        status: "warning",
        duration: 4000,
        isClosable: true,
        colorScheme: "red",
      });
    } else if (htmletn != "html" || gifetn != "gif") {
      toast({
        title: "You Have to Upload Proper File and Extension",
        status: "warning",
        duration: 4000,
        isClosable: true,
        colorScheme: "red",
      });
    } else {
      const formData = new FormData();
      formData.append("template", validbusinessTemplate.template);
      formData.append("templateImage", validbusinessTemplate.templateImage);
      try {
        const response = await axios.post(
          "http://localhost:8000/wda/business/uploadTemplateDetails",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for file upload
            },
          }
        );
        toast({
          title: response.data.message,
          status: "warning",
          duration: 9000,
          isClosable: true,
          colorScheme: "blue",
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // const convertImageToBase64 = (imageFile, imageKey) => {
  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     const base64String = e.target.result;

  //     setBusinessTemplate((prevImages) => ({
  //       ...prevImages,
  //       [imageKey]: base64String,
  //     }));
  //   };

  //   reader.readAsDataURL(imageFile);
  // };

  return (
    <Box
      bgImage={background}
      // bgSize={{ md: "contain", lg: "contain" }}
      bgSize={{ base: "cover", md: "contain", lg: "contain" }}
      placeItems="center"
      // position={"fixed"}
      width={{ base: "100%", sm: "100%", md: "100vw", lg: "100%" }}
      // height={{ base: "100%", sm: "100%", md: "100%" ,lg:"100vh"}}
      minW={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}
      minH={{ base: "100%", sm: "100%", md: "100vh", lg: "100vh" }}
      bgPosition="center"
      bgRepeat={"no-repeat"}
      overflowY={"hidden"}
    >
      <Box
        justifyContent="right"
        right="45%"
        minW={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}
        minH={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}
        // h={{ md: "100%" }}
      >
        <Text
          mt={{ base: "5%", md: "3%" }}
          fontSize="45px"
          fontFamily={"noto-serif"}
          fontWeight={"light"}
          color="black"
          w="100%"
          h="50px"
          alignItems={"center"}
          textAlign="center"
        >
          Administrator
        </Text>
        <Image
          src={logo}
          boxSize={{
            base: "100px",
            md: "80px",
            lg: "100px",
          }}
          float="right"
          mr="2%"
          mt={"-3.5%"}
        ></Image>

        <Tabs
          align="center"
          size="lg"
          // mt="5%"
          // position={{ md: "relative" }}
          variant="unstyled"
        >
          {/* <TabList position={"relative"} top={{ md: "0", lg: "-36px" }}>
            <Tab>Status & Query</Tab>
            <Tab>Templates</Tab>
          </TabList> */}
          {/* <TabIndicator
            position={"relative"}
            height="3px"
            bg="#1A237E"
            borderRadius="1px"
            top={{ md: "55px", lg: "20px" }}
          /> */}

          <TabPanels
            mt={{ md: "20", lg: "18" }}
            right={{ md: "5%" }}
            alignItems="center"
            overflowY={{ md: "scroll", lg: "scroll" }}
            h={{ base: "auto", md: "80%", lg: "20%" }}
            w={{ base: "100%", md: "100%", lg: "100%" }}
            maxH={{ md: "80vh", lg: "60vh" }}
            sx={{
              "&::-webkit-scrollbar": {
                width: "16px",
              },
            }}
            overflowX={"hidden"}
          >
            <TabPanel
              //  px={2}
              justifyContent="center"
              alignItems="center"

              // top={{lg:"-25px"}}
              // position="relative"
            >
              <Grid
                gridTemplateColumns={{ base: "1fr", md: "1fr", lg: "1fr 1fr" }}
                gap={{ base: "1rem", md: "2rem", lg: "2rem" }}
                width="100%"
                minW={{ base: "100%", md: "50%", lg: "100%" }}
                // left="15vh"
                left={{ md: "0", lg: "15vh" }}
                position="relative"
                mx="auto"
                ml={{ md: "1px", lg: "0" }}
                p={{ md: "10px", lg: "0" }}
              >
                <Box
                  overflow="auto"
                  border="1px solid #ccc"
                  borderRadius="md"
                  bgColor={"white"}
                  position={"relative"}
                  right={{ md: "0", lg: "6%" }}
                  p={1}
                  // minH={{ base: "100%", md: "80%", lg:"100%" }}
                  minW={{ base: "100%", md: "70%", lg: "116%" }}
                  maxH={{ base: "100vh", lg: "60vh" }}
                >
                  <Box
                    // minW={{ base: "100%", md: "100%", lg:"100%"}}
                    w={{ base: "100%", md: "100%", lg: "98%" }}
                  >
                    <UpdateStatus />
                  </Box>
                </Box>
                <Box
                  overflow="auto"
                  border="1px solid #ccc"
                  borderRadius="md"
                  p={3}
                  maxW={{ base: "100%", md: "100%", lg: "70%" }}
                  // left={"10%"}
                  bgColor={"white"}
                  left={{ md: "0", lg: "10%" }}
                  position={"relative"}
                  maxH={{ base: "100vh", lg: "60vh" }}
                >
                  <Query />
                  {/* static imformative box for user */}
                </Box>
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Box
          bgColor={"white"}
          w={{ base: "100%", sm: "100%", md: "92%", lg: "70%" }}
          rounded={"xl"}
          display={{ lg: "flex" }}
          left={{ lg: "15%", md: "4%" }}
          top={{ lg: "20px" }}
          position={"relative"}
          // alignItems={"center"}
          // justifyContent={"center"}
          // mb={2}
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        >
          <Box
            w={{ base: "100%", sm: "80%", md: "100%", lg: "100%" }}
            p={2}
            mx="auto"
          >
            <Stack direction={{ base: "column", sm: "row" }}>
              <Box
                p={["1px", "1px", "1px"]}
                // w={["100%", "50%", "100%"]}
                w={{ md: "100%", lg: "100%" }}
              >
                <Text
                  fontSize={{ base: "2xl", md: "xl", lg: "2xl" }}
                  position={"relative"}
                  textAlign="left"
                  ml={{ base: "0", sm: "0", md: "1", lg: "3" }}
                >
                  Upload Template
                </Text>
              </Box>
              <Box
                p={["1px", "1px", "1px"]}
                w={["100%", "30%", "160%"]}
                textAlign="center"
              >
                <Input
                  type="file"
                  variant="outline"
                  placeholder="Uploaded File Name"
                  rounded={"30px"}
                  name="template"
                  onChange={(e) => onChange(e, "template")}
                />
              </Box>
              <Box
                p={["1px", "1px", "1px"]}
                w={["100%", "30%", "160%"]}
                textAlign="center"
              >
                <Input
                  type="file"
                  variant="outline"
                  placeholder="Uploaded Gif  Name"
                  rounded={"30px"}
                  name="templateImage"
                  onChange={(e) => onChange(e, "templateImage")}
                />
              </Box>
              <Box
                p={["1px", "1px", "1px"]}
                // w={["100%", "30%", "25%"]}
                w={{ lg: "25%", md: "100%" }}
                textAlign="right"
              >
                <Button
                  type="submit"
                  bg="#1A237E"
                  color="white"
                  h={10}
                  w={150}
                  // size={"md"}
                  position={"relative"}
                  // b={10}
                  _hover={{ bg: " #202A9A" }}
                  rounded={"50px"}
                  alignItems={"center"}
                  fontFamily={"sans-serif"}
                  fontWeight={"light"}
                  fontSize={13}
                  onClick={templateUpload}
                >
                  Upload
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;

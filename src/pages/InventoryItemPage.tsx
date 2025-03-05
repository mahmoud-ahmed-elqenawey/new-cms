import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowRight, History, FileText } from "lucide-react";
import {
  VStack,
  HStack,
  Box,
  Text,
  Button,
  Grid,
  GridItem,
  Image,
  Heading,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { useCustomQuery } from "@/hooks/useQuery";
import Loading from "@/components/core/Loading";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";

export default function InventoryItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  const { open, onOpen, onClose } = useDisclosure();

  const item = useCustomQuery(
    ["inventory_item", id],
    `inventory/v2/item/${id}`
  );

  const getHistoryTypeLabel = (type: string) => {
    switch (type) {
      case "ItemIn":
        return "وارد";
      case "ItemOut":
        return "صادر";
      case "Inventory":
        return "جرد";
    }
  };

  const getHistoryTypeColorScheme = (type: string) => {
    switch (type) {
      case "ItemIn":
        return "green";
      case "ItemOut":
        return "red";
      case "Inventory":
        return "blue";
    }
  };

  const handleImageClick = (url: string, alt: string) => {
    setSelectedImage({ url, alt });
    onOpen();
  };

  if (!item) return null;

  if (item.isPending) return <Loading />;

  return (
    <VStack gap={6} align="stretch" p={4}>
      <Button
        onClick={() => navigate("/inventory")}
        variant="ghost"
        colorScheme="green"
      >
        <ArrowRight />
        العودة إلى المخزون
      </Button>

      <Box borderWidth={1} borderRadius="lg" p={6} bg="white">
        <Flex direction={{ base: "column", md: "row" }} gap={6}>
          {item?.data?.data?.item?.history[0]?.images[0] && (
            <Box
              position="relative"
              width={{ base: "full", md: "64" }}
              height="64"
              borderRadius="lg"
              overflow="hidden"
              bg="gray.100"
              cursor="pointer"
              onClick={() =>
                handleImageClick(
                  item?.data?.data?.item?.history[0].images[0],
                  item?.data?.data?.item?.name
                )
              }
            >
              <Image
                src={item?.data?.data?.item?.history[0].images[0]}
                alt={item?.data?.data?.item?.name}
                objectFit="cover"
                width="full"
                height="full"
              />
            </Box>
          )}

          <VStack align="stretch" flex={1} gap={4}>
            <Heading size="xl" color="gray.900">
              {item?.data?.data?.item?.name}
            </Heading>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {[
                {
                  label: "الكمية الحالية",
                  value: item?.data?.data?.item?.currentQuantity,
                },
                {
                  label: "إجمالي الكمية",
                  value: item?.data?.data?.item?.totalQuantity,
                },
                { label: "المركز", value: item?.data?.data?.item?.center.name },
                {
                  label: "التصنيف",
                  value: item?.data?.data?.item?.subcategory?.category?.name,
                },
                {
                  label: "التصنيف الفرعي",
                  value: item?.data?.data?.item?.subcategory?.name,
                },
              ].map((detail, index) => (
                <GridItem key={index}>
                  <Text fontSize="sm" color="gray.500">
                    {detail.label}
                  </Text>
                  <Text fontWeight="medium" fontSize="lg">
                    {detail.value}
                  </Text>
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </Flex>
      </Box>

      <Box borderWidth={1} borderRadius="lg" p={6} bg="white">
        <HStack gap={2} mb={6}>
          <History color="#67B37D" />
          <Heading size="md">سجل الحركات</Heading>
        </HStack>

        <VStack gap={4} align="stretch">
          {item?.data?.data?.item.history.map((record: any, index: any) => (
            <Box
              key={index}
              borderWidth={1}
              borderRadius="lg"
              p={4}
              bg={`${getHistoryTypeColorScheme(record.type)}.100`}
            >
              <Flex justifyContent="space-between" alignItems="start" mb={4}>
                <VStack align="start" gap={1}>
                  <HStack>
                    <Text
                      fontSize="sm"
                      px={2}
                      py={0.5}
                      borderRadius="full"
                      bg={`${getHistoryTypeColorScheme(record.type)}.50`}
                    >
                      {getHistoryTypeLabel(record.type)}
                    </Text>
                  </HStack>
                  <Text fontSize="sm" opacity={0.75}>
                    {new Date(record.date).toLocaleString("ar-EG")}
                  </Text>
                </VStack>
                <Text
                  fontSize="lg"
                  fontWeight="medium"
                  color={`${getHistoryTypeColorScheme(record.type)}`}
                >
                  {record.type === "ItemIn"
                    ? "+"
                    : record.type === "ItemOt"
                    ? "-"
                    : ""}
                  {record.quantity}
                </Text>
              </Flex>

              {record.details && (
                <Box
                  bg={`${getHistoryTypeColorScheme(record.type)}.50`}
                  p={3}
                  borderRadius="lg"
                  mb={4}
                >
                  <Text fontSize="sm">
                    <Text as="span" fontWeight="medium">
                      التفاصيل:{" "}
                    </Text>
                    {record.details}
                  </Text>
                </Box>
              )}

              <Flex flexWrap="wrap" gap={4}>
                {record.images.length > 0 && (
                  <Box flex={1} minWidth="200px">
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      الصور:
                    </Text>
                    <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                      {record.images.map((image: any, idx: any) => (
                        <Box
                          key={idx}
                          position="relative"
                          // height="20"
                          borderRadius="lg"
                          overflow="hidden"
                          bg="gray.100"
                          cursor="pointer"
                          onClick={() =>
                            handleImageClick(
                              image,
                              `صورة ${getHistoryTypeLabel(record.type)} - ${
                                idx + 1
                              }`
                            )
                          }
                        >
                          <Image
                            src={image}
                            alt={`صورة ${idx + 1}`}
                            // objectFit="cover"
                            // width="full"
                            // height="full"
                            minW="300px"
                            minH="300px"
                          />
                        </Box>
                      ))}
                    </Grid>
                  </Box>
                )}

                {record.documents && record.documents.length > 0 && (
                  <Box flex={1} minWidth="200px">
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      المستندات:
                    </Text>
                    <VStack gap={2} align="start">
                      {record.documents.map((doc: any, idx: any) => (
                        <Button
                          asChild
                          key={idx}
                          as="a"
                          rel="noopener noreferrer"
                          variant="solid"
                          size="sm"
                        >
                          <a href={doc} target="_blank">
                            <FileText />
                            مستند {idx + 1}
                          </a>
                        </Button>
                      ))}
                    </VStack>
                  </Box>
                )}
              </Flex>
            </Box>
          ))}
        </VStack>
      </Box>

      <DialogRoot open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> عرض الصورة </DialogTitle>
          </DialogHeader>
          <DialogCloseTrigger top="0" insetEnd="-12" bg="bg" />

          <DialogBody>
            {selectedImage && (
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                objectFit="contain"
                width="full"
                maxHeight="80vh"
              />
            )}
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </VStack>
  );
}

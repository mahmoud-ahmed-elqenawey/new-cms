import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Table,
  IconButton,
  useDisclosure,
  Image,
  Text,
} from "@chakra-ui/react";
import {
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  Settings2,
  Info,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../ui/dialog";

interface Column {
  label: string;
  field: string;
  render?: (row: any) => any;
}

interface Sort {
  field: string;
  direction: "asc" | "desc" | null;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (id: string) => void;
  sort?: Sort;
  onSort?: (field: string) => void;
  storageKeyName: string;
}

export default function DataTable({
  columns,
  data,
  onRowClick,
  sort = { field: "", direction: null },
  onSort,
  storageKeyName,
}: DataTableProps) {
  const STORAGE_KEY = storageKeyName;
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(() => {
    const savedColumns = localStorage.getItem(STORAGE_KEY);
    if (savedColumns) {
      return new Set(JSON.parse(savedColumns));
    }
    return new Set(columns.map((col) => col.field));
  });
  const { open, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...visibleColumns]));
  }, [visibleColumns]);

  const toggleColumn = (field: string) => {
    const newVisibleColumns = new Set(visibleColumns);
    if (newVisibleColumns.has(field)) {
      if (newVisibleColumns.size > 1) {
        newVisibleColumns.delete(field);
      }
    } else {
      newVisibleColumns.add(field);
    }
    setVisibleColumns(newVisibleColumns);
  };

  const visibleColumnsArray = columns.filter((col) =>
    visibleColumns.has(col.field)
  );

  const renderMobileView = () => (
    <Box display={{ base: "block", md: "none" }} gap={4}>
      {data.map((row) => (
        <Box
          key={row.id}
          onClick={() => onRowClick?.(row.id)}
          bg="white"
          p={4}
          borderRadius="lg"
          border="1px"
          borderColor="gray.200"
          _hover={{ bg: "gray.50" }}
          cursor="pointer"
          transition="background-color 0.2s"
        >
          {row.alert && (
            <Flex
              align="center"
              gap={2}
              mb={3}
              color="red.600"
              bg="red.50"
              p={2}
              borderRadius="md"
            >
              <AlertCircle size={20} />
              <Text fontSize="sm">{row.alert}</Text>
            </Flex>
          )}
          {columns.map(({ label, field }) => (
            <Flex key={field} justify="space-between" align="center" py={1}>
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                {label}
              </Text>
              <Text fontSize="sm" color="gray.900">
                {field === "image" ? (
                  <Image
                    src={row[field]}
                    alt="Product"
                    w={12}
                    h={12}
                    objectFit="cover"
                    borderRadius="lg"
                    cursor="pointer"
                    onClick={() => {
                      setSelectedImage({
                        url: row.image,
                        alt: row.name,
                      });
                    }}
                  />
                ) : columns.find((col) => col.field === field)?.render ? (
                  columns.find((col) => col.field === field)!.render!(row)
                ) : (
                  row[field]
                )}
              </Text>
            </Flex>
          ))}
        </Box>
      ))}
    </Box>
  );

  const renderDesktopView = () => (
    <>
      <Box
        display={{ base: "none", md: "flex" }}
        justifyContent="flex-end"
        mb={4}
      >
        <Box position="relative">
          <Flex align="center" gap={4}>
            <IconButton
              aria-label="Column settings"
              onClick={onOpen}
              variant="outline"
              colorScheme="gray"
            >
              <Settings2 size={16} />
            </IconButton>
          </Flex>
        </Box>
      </Box>
      <Box
        display={{ base: "none", md: "block" }}
        overflowX="auto"
        borderRadius="lg"
        border="1px"
        borderColor="gray.200"
      >
        <Table.Root variant="line">
          <Table.Header bg="gray.50">
            <Table.Row>
              {visibleColumnsArray.map(({ label, field }) => (
                <Table.ColumnHeader
                  key={field}
                  textAlign="right"
                  fontSize="xs"
                  fontWeight="medium"
                  color="gray.500"
                  textTransform="uppercase"
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  transition="background-color 0.2s"
                  onClick={() => onSort?.(field)}
                >
                  <Flex align="center" justify="flex-start" gap={1}>
                    {label}
                    <Box>
                      {sort.field === field ? (
                        sort.direction === "asc" ? (
                          <ChevronUp size={16} color="#67B37D" />
                        ) : sort.direction === "desc" ? (
                          <ChevronDown size={16} color="#67B37D" />
                        ) : (
                          <ArrowUpDown size={16} color="gray.400" />
                        )
                      ) : (
                        <ArrowUpDown size={16} color="gray.400" />
                      )}
                    </Box>
                  </Flex>
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((row) => (
              <Table.Row
                key={row.id}
                onClick={() => onRowClick?.(row.id)}
                _hover={{ bg: "gray.50" }}
                cursor="pointer"
                transition="background-color 0.2s"
                bg={row.alert ? "red.50" : "white"}
              >
                {visibleColumnsArray.map(({ field }, index) => (
                  <Table.Cell
                    key={field}
                    px={6}
                    py={4}
                    whiteSpace="nowrap"
                    fontSize="sm"
                    color="gray.900"
                    textAlign="start"
                  >
                    <Flex align="start" gap={2}>
                      {index === 0 && row.alert && (
                        <Tooltip content={row.alert}>
                          <Info color="#f87171" />
                        </Tooltip>
                      )}
                      {field === "image" ? (
                        <Image
                          src={row[field]}
                          alt="Product"
                          w={12}
                          h={12}
                          objectFit="cover"
                          borderRadius="lg"
                          cursor="pointer"
                          onClick={() => {
                            setSelectedImage({
                              url: row.image,
                              alt: row.name,
                            });
                          }}
                        />
                      ) : columns.find((col) => col.field === field)?.render ? (
                        columns.find((col) => col.field === field)!.render!(row)
                      ) : (
                        row[field]
                      )}
                    </Flex>
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      <DialogRoot open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إعدادات الأعمدة</DialogTitle>
          </DialogHeader>
          <DialogCloseTrigger top="0" insetEnd="-12" bg="bg" />

          <DialogBody>
            <Flex direction="column">
              {columns.map(({ label, field }) => (
                <Checkbox
                  defaultChecked={visibleColumns.has(field)}
                  onChange={() => toggleColumn(field)}
                  disabled={
                    visibleColumns.has(field) && visibleColumns.size === 1
                  }
                  cursor="pointer"
                  p={2}
                  _hover={{ bg: "gray.100" }}
                  key={field}
                >
                  {label}
                </Checkbox>
              ))}
            </Flex>
          </DialogBody>
        </DialogContent>
      </DialogRoot>

      {selectedImage && (
        <DialogRoot
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedImage.alt}</DialogTitle>
            </DialogHeader>
            <DialogCloseTrigger top="0" insetEnd="-12" bg="bg" />

            <DialogBody>
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                w="full"
                borderRadius="lg"
              />
            </DialogBody>
          </DialogContent>
        </DialogRoot>
      )}
    </>
  );

  return (
    <Box>
      {renderMobileView()}
      {renderDesktopView()}
    </Box>
  );
}

import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Download, Filter, NotepadText } from "lucide-react";

type PageHeader = {
  title: string;
  count?: string;
  countLoading?: boolean;
  showFilters?: boolean;
  setShowFilters?: (state: boolean) => void;
  buttonLoading?: boolean;
  buttonClick?: () => void;
};

const PageHeader = ({
  title,
  count,
  countLoading,
  showFilters,
  setShowFilters,
  buttonLoading,
  buttonClick,
}: PageHeader) => {
  return (
    <Flex align="center" justifyContent="space-between" mb="6">
      <Box>
        <Heading display="flex" alignItems="center" gap="2">
          <NotepadText />

          {title}
        </Heading>
        <Text fontSize="sm" color="gray">
          {!countLoading ? count : "تحميل"}
        </Text>
      </Box>
      {setShowFilters && (
        <Button onClick={() => setShowFilters(!showFilters)} variant="ghost">
          <Filter />
          {showFilters ? "إخفاء الفلترة" : "إظهار الفلترة"}
        </Button>
      )}
      <div>
        {buttonClick && (
          <Button
            onClick={() => buttonClick()}
            variant="subtle"
            colorPalette="green"
            loading={buttonLoading}
          >
            <Download />
            تحميل ملف Excel
          </Button>
        )}
      </div>
    </Flex>
  );
};

export default PageHeader;

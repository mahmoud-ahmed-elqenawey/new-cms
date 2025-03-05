import {
  Box,
  Grid,
  Text,
  Stat,
  StatLabel,
  StatHelpText,
  Table,
  Badge,
  Heading,
} from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { NotepadText } from "lucide-react";

// تسجيل مكونات Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// بيانات الرسم البياني
const chartData = {
  labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو"],
  datasets: [
    {
      label: "الإيرادات",
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    },
  ],
};

// بيانات الجدول
const tableData = [
  { id: 1, name: "محمد علي", email: "mohamed@example.com", role: "مدير" },
  { id: 2, name: "أحمد خالد", email: "ahmed@example.com", role: "مستخدم" },
  { id: 3, name: "سارة محمد", email: "sara@example.com", role: "مستخدم" },
];

function Home() {
  const cardBg = "white";

  return (
    <Box>
      <Heading mb="4" display="flex" alignItems="center" gap="2">
        <NotepadText />
        لوحة التحكم
      </Heading>
      {/* بطاقات الإحصاءات */}
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
        gap={6}
        mb={8}
      >
        <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
          <Stat.Root>
            <Stat.Label>عدد المستخدمين</Stat.Label>
            <Stat.ValueText>1,234</Stat.ValueText>
            <StatHelpText>
              <Stat.DownIndicator />
              12%
            </StatHelpText>
          </Stat.Root>
        </Box>
        <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
          <Stat.Root>
            <StatLabel>عدد الطلبات</StatLabel>
            <Stat.ValueText>567</Stat.ValueText>
            <StatHelpText>
              <Stat.UpIndicator />
              5%
            </StatHelpText>
          </Stat.Root>
        </Box>
        <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
          <Stat.Root>
            <Stat.Label>الإيرادات</Stat.Label>
            <Stat.ValueText>$12,345</Stat.ValueText>
            <Stat.HelpText>
              <Stat.UpIndicator />
              20%
            </Stat.HelpText>
          </Stat.Root>
        </Box>
        <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
          <Stat.Root>
            <Stat.Label>المشاريع النشطة</Stat.Label>
            <Stat.ValueText>45</Stat.ValueText>
            <Badge colorPalette="green" variant="plain" px="0">
              <Stat.UpIndicator />
              8%
            </Badge>
          </Stat.Root>
        </Box>
      </Grid>

      {/* الرسم البياني */}
      <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md" mb={8}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          الإيرادات الشهرية
        </Text>
        <Line data={chartData} />
      </Box>

      {/* الجدول */}
      <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          المستخدمين
        </Text>
        <Table.Root variant="line">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>الاسم</Table.ColumnHeader>
              <Table.ColumnHeader>البريد الإلكتروني</Table.ColumnHeader>
              <Table.ColumnHeader>الدور</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableData.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}

export default Home;

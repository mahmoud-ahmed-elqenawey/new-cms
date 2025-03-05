import {
  VStack,
  Box,
  Flex,
  Avatar,
  Text,
  Heading,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  GraduationCap,
  Phone,
  Calendar,
  Clock,
  ArrowRight,
  Book,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../ui/accordion";
import { formatDate } from "@/services/date";

interface StudentDetailsViewProps {
  student: any;
  courses: any[];
  onBack: () => void;
}

export default function StudentDetailsView({
  student,
  courses,
  onBack,
}: StudentDetailsViewProps) {
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  const infoItems = [
    {
      icon: GraduationCap,
      label: "المستوى التعليمي",
      value: student.education_level,
    },
    {
      icon: Phone,
      label: "رقم الهاتف",
      value: student.mobile_number,
    },
    {
      icon: Calendar,
      label: "تاريخ الميلاد",
      value: formatDate(student.date_of_birth),
    },
    {
      icon: Clock,
      label: "العمر",
      value: `${student.age} سنة`,
    },
  ];

  const getStatusIcon = (status: any) => {
    switch (status) {
      case "paid":
        return <CheckCircle color="green" />;
      case "pending":
        return <Clock color="blue" />;
      case "overdue":
        return <AlertCircle color="red" />;
    }
  };

  const getStatusText = (status: any) => {
    switch (status) {
      case "paid":
        return "تم الدفع";
      case "pending":
        return "قيد الانتظار";
      case "overdue":
        return "متأخر";
    }
  };

  return (
    <VStack gap={6} align="stretch" p={4}>
      {/* Header */}
      <Flex justifyContent="space-between" alignItems="start">
        <Flex alignItems="center" gap={6}>
          <Avatar.Root size="2xl" bg="gray.100" color="gray.400">
            <Avatar.Fallback name={student.name} />
            <Avatar.Image src={student.image} />
          </Avatar.Root>
          <Box>
            <Heading size="xl" color="gray.900">
              {student.name}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              تاريخ الانضمام: {formatDate(student.created_at)}
            </Text>
          </Box>
        </Flex>

        <Button onClick={onBack} variant="ghost" colorScheme="green">
          <ArrowRight />
          العودة إلى قائمة الطلاب
        </Button>
      </Flex>

      {/* Student Info */}
      <Box borderWidth={1} borderRadius="lg" p={6} bg="white">
        <Heading size="md" color="gray.900" mb={6}>
          معلومات الطالب
        </Heading>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          {infoItems.map(({ icon: Icon, label, value }) => (
            <GridItem key={label} display="flex" alignItems="center" gap={3}>
              <Icon color="#67B37D" size={20} />
              <Box>
                <Text fontSize="sm" color="gray.500">
                  {label}
                </Text>
                <Text fontWeight="medium">{value}</Text>
              </Box>
            </GridItem>
          ))}
        </Grid>

        {student.notes && (
          <>
            <Box bg="gray.400" w="full" my={6} />
            <Flex alignItems="center" gap={3}>
              <FileText color="#67B37D" size={20} />
              <Box>
                <Text fontSize="sm" color="gray.500">
                  ملاحظات
                </Text>
                <Text mt={1} color="gray.700">
                  {student.notes}
                </Text>
              </Box>
            </Flex>
          </>
        )}
      </Box>

      {/* Courses */}
      <Box borderWidth={1} borderRadius="lg" p={6} bg="white">
        <Heading size="md" color="gray.900" mb={6}>
          الدورات المسجلة
        </Heading>

        <AccordionRoot>
          {courses.map((course) => (
            <AccordionItem
              key={course.id}
              border="1px"
              borderColor="gray.100"
              borderRadius="lg"
              mb={2}
              value={course.name}
            >
              <AccordionItemTrigger
                onClick={() =>
                  setExpandedCourseId(
                    expandedCourseId === course.id ? null : course.id
                  )
                }
                _hover={{ bg: "gray.50" }}
              >
                <Flex flex={1} textAlign="right" alignItems="center" gap={3}>
                  <Book color="#67B37D" size={20} />
                  <VStack align="start" gap={0}>
                    <Text fontWeight="medium">{course.name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      المدرب: {course.instructor} | تاريخ البدء:{" "}
                      {formatDate(course.start_date)}
                    </Text>
                  </VStack>
                </Flex>
              </AccordionItemTrigger>
              <AccordionItemContent pb={4}>
                <Box gapY={3}>
                  {course.payments.map((payment: any) => (
                    <Flex
                      key={payment.id}
                      alignItems="center"
                      justify="space-between"
                      p="3"
                      rounded="lg"
                      border="1px solid gray.100"
                      _hover={{ bg: "gray.100/50" }}
                    >
                      <Flex alignItems="center" gap="3">
                        <Calendar color="#67B37D" width="20px" height="20px" />
                        <Text color="gray.600" fontSize="sm">
                          {new Date(payment.date).toLocaleDateString("ar-EG")}
                        </Text>
                      </Flex>
                      <Flex alignItems="center" gap={6}>
                        <Text fontWeight="medium">{payment.amount} ريال</Text>
                        <Flex alignItems="center" gap="2">
                          {getStatusIcon(payment.status)}
                          <Text fontSize="sm">
                            {getStatusText(payment.status)}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  ))}
                </Box>
              </AccordionItemContent>
            </AccordionItem>
          ))}
        </AccordionRoot>
      </Box>
    </VStack>
  );
}

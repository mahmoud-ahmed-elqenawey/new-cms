import { useState } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Heading,
  Grid,
  GridItem,
  Spinner,
  Table,
  DialogTitle,
} from "@chakra-ui/react";
import { useCustomQuery } from "@/hooks/useQuery";
import { BackpackIcon } from "lucide-react";
import {
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "../ui/dialog";
import useAuth from "@/store/useAuth";

interface CourseDetailsProps {
  details: any;
  onBack: () => void;
  onCourseFinished: (data?: any) => void;
}

// Utility functions (assuming these were defined elsewhere)
const formatDate = (dateString: string) => {
  // Implement date formatting logic
  return dateString;
};

const getNumberBeforeDot = (num: number) => {
  return Math.floor(num);
};

const getAttendanceStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "green";
    case "Inactive":
      return "red";
    default:
      return "gray";
  }
};

export default function CourseDetails({
  details,
  onBack,
  onCourseFinished,
}: CourseDetailsProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { user } = useAuth();
  const permission: any = user;

  const students = useCustomQuery(
    [`tajweed/dashboard/course/id/students`, details.id],
    `tajweed/dashboard/course/${details.id}/students`
  );

  const handleFinishCourse = async () => {
    onCourseFinished?.();
  };

  return (
    <VStack gap={6} align="stretch">
      <HStack justifyContent="space-between">
        <Button colorScheme="green" variant="ghost" onClick={onBack}>
          <BackpackIcon />
          العودة إلى قائمة الدورات
        </Button>

        {permission?.permission?.__04__all_tajweed_data_access &&
          !details.finished_at && (
            <Button
              colorScheme="red"
              onClick={() => setShowConfirmDialog(true)}
              // loading={isFinishing}
            >
              إنهاء الدورة
            </Button>
          )}
      </HStack>

      <DialogRoot
        open={showConfirmDialog}
        onOpenChange={() => setShowConfirmDialog(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد إنهاء الدورة</DialogTitle>
          </DialogHeader>

          <DialogBody>
            <DialogDescription>
              <Text>
                هل أنت متأكد من رغبتك في إنهاء الدورة؟ لا يمكن التراجع عن هذا
                الإجراء.
              </Text>
            </DialogDescription>
          </DialogBody>
          <DialogFooter>
            <HStack gap={3}>
              <Button
                colorScheme="red"
                onClick={handleFinishCourse}
                // loading={isFinishing}
              >
                تأكيد الإنهاء
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowConfirmDialog(false)}
              >
                إلغاء
              </Button>
            </HStack>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      <Box borderWidth={1} borderRadius="lg" p={6}>
        <VStack gap={6} align="stretch">
          <Heading size="lg">{details.name}</Heading>

          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {[
              { label: "المدرب", value: details.instructor },
              {
                label: "تكلفة المدرب",
                value: `${details.instructor_cost} دينار`,
              },
              { label: "رسوم الدورة", value: `${details.price} دينار` },
              { label: "تاريخ البداية", value: details.date },
            ].map((item, index) => (
              <GridItem key={index}>
                <Text fontSize="sm" color="gray.500">
                  {item.label}
                </Text>
                <Text fontWeight="medium">{item.value}</Text>
              </GridItem>
            ))}
          </Grid>

          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {[
              {
                label: "عدد الطلاب",
                value: details.number_of_students,
                colorScheme: "blue",
              },
              {
                label: "عدد الحصص",
                value: details.number_of_sessions,
                colorScheme: "green",
              },
              {
                label: "نسبة الحضور",
                value: `${details.attendance_percentage}%`,
                colorScheme: "yellow",
              },
            ].map((item, index) => (
              <GridItem key={index}>
                <Box bg={`${item.colorScheme}.50`} p={4} borderRadius="lg">
                  <Text color="gray.600">{item.label}</Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    {item.value}
                  </Text>
                </Box>
              </GridItem>
            ))}
          </Grid>

          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {[
              {
                label: "المبلغ المحصل",
                value: `${details.payment} دينار`,
                colorScheme: "purple",
              },
              {
                label: "المبلغ المتوقع",
                value: `${details.payment_goal} دينار`,
                colorScheme: "indigo",
              },
              {
                label: "نسبة التحصيل",
                value: `${details.payment_percentage}%`,
                colorScheme: "pink",
              },
            ].map((item, index) => (
              <GridItem key={index}>
                <Box bg={`${item.colorScheme}.50`} p={4} borderRadius="lg">
                  <Text color="gray.600">{item.label}</Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    {item.value}
                  </Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </VStack>
      </Box>

      {students.isPending ? (
        <Box textAlign="center" py={8}>
          <Spinner size="xl" />
          <Text mt={4}>جاري تحميل بيانات الطلاب...</Text>
        </Box>
      ) : (
        <Box borderWidth={1} borderRadius="lg" p={6}>
          <Heading size="md" mb={6}>
            قائمة الطلاب
          </Heading>

          <Table.Root variant="line">
            <Table.Header>
              <Table.Row>
                {[
                  "الاسم",
                  "العمر",
                  "تاريخ الانضمام",
                  "عدد الحصص المحضورة",
                  "نسبة الحضور",
                  "المبلغ المدفوع",
                  "حالة الحضور",
                ].map((header) => (
                  <Table.ColumnHeader key={header} textAlign="right">
                    {header}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {students.data.data.map((student: any) => (
                <Table.Row key={student.id}>
                  <Table.Cell>{student.name}</Table.Cell>
                  <Table.Cell>{student.age}</Table.Cell>
                  <Table.Cell>{formatDate(student.enrollment_date)}</Table.Cell>
                  <Table.Cell>{student.attended_sessions_count}</Table.Cell>
                  <Table.Cell>
                    {getNumberBeforeDot(student.attendance_percentage)}%
                  </Table.Cell>
                  <Table.Cell>
                    {student.total_payment
                      ? `${student.total_payment} دينار`
                      : "-"}
                  </Table.Cell>
                  <Table.Cell>
                    <Table.Cell
                      colorScheme={getAttendanceStatusColor(
                        student.attendance_status
                      )}
                    >
                      {student.attendance_status}
                    </Table.Cell>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      )}
    </VStack>
  );
}

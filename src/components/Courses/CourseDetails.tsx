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
  Textarea,
  useDisclosure,
  IconButton,
  Input,
  Badge,
} from "@chakra-ui/react";
import { useCustomQuery } from "@/hooks/useQuery";
import { BackpackIcon, Ban, Edit2, UserMinus } from "lucide-react";
import {
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "../ui/dialog";
import useAuth from "@/store/useAuth";
import { Field } from "../ui/field";
import { formatDate } from "@/services/date";

interface CourseDetailsProps {
  details: any;
  onBack: () => void;
  onCourseFinished: (data?: any) => void;
}

// Utility functions (assuming these were defined elsewhere)
// const formatDate = (dateString: string) => {
//   // Implement date formatting logic
//   return dateString;
// };

const getNumberBeforeDot = (num: number) => {
  return Math.floor(num);
};

const getAttendanceStatusColor = (status: string) => {
  switch (status) {
    case "ملتزم تمامًا":
      return "green";
    case "لم يحضر مطلقا":
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
  const [closureNotes, setClosureNotes] = useState(details.closure_notes || "");
  const [startDate, setStartDate] = useState(formatDate(details.date));
  const [notes, setNotes] = useState(details.notes || "");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [withdrawalReason, setWithdrawalReason] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [cancelNotes, setCancelNotes] = useState("");
  // Edit dialogs state
  const {
    open: isDateEditOpen,
    onOpen: onDateEditOpen,
    onClose: onDateEditClose,
  } = useDisclosure();

  const {
    open: isNotesEditOpen,
    onOpen: onNotesEditOpen,
    onClose: onNotesEditClose,
  } = useDisclosure();

  const {
    open: isWithdrawalOpen,
    onOpen: onWithdrawalOpen,
    onClose: onWithdrawalClose,
  } = useDisclosure();

  const {
    open: isCancelCourseOpen,
    onOpen: onCancelCourseOpen,
    onClose: onCancelCourseClose,
  } = useDisclosure();

  const { user } = useAuth();
  const permission: any = user;

  const students = useCustomQuery(
    [`tajweed/dashboard/course/id/students`, details.id],
    `tajweed/dashboard/course/${details.id}/students`
  );

  const handleFinishCourse = async () => {
    if (!closureNotes.trim()) {
      return;
    }
    onCourseFinished?.({ end_notes: closureNotes });
    setShowConfirmDialog(false);
    setClosureNotes("");
  };

  const handleDateSave = () => {
    // Here you would typically make an API call to update the date
    console.log("Saving new start date:", startDate);
    onDateEditClose();
  };

  const handleNotesSave = () => {
    // Here you would typically make an API call to update the notes
    console.log("Saving new notes:", notes);
    onNotesEditClose();
  };

  const handleCancelCourse = () => {
    // Here you would typically make an API call to cancel the course
    console.log("Cancelling course with reason:", cancelReason);
    console.log("Cancel notes:", cancelNotes);
    onCancelCourseClose();
    setCancelReason("");
    setCancelNotes("");
  };

  const handleWithdrawal = () => {
    // Here you would typically make an API call to process the withdrawal
    console.log("Processing withdrawal for student:", selectedStudent?.name);
    console.log("Withdrawal reason:", withdrawalReason);
    onWithdrawalClose();
    setWithdrawalReason("");
    setSelectedStudent(null);
  };

  const openWithdrawalDialog = (student: any) => {
    setSelectedStudent(student);
    onWithdrawalOpen();
  };

  return (
    <VStack gap={6} align="stretch">
      <HStack justifyContent="space-between">
        <Button colorScheme="green" variant="ghost" onClick={onBack}>
          <BackpackIcon />
          العودة إلى قائمة الدورات
        </Button>

        <HStack gap={2}>
          {permission?.permission?.__04__all_tajweed_data_access &&
            !details.finished_at && (
              <>
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={onCancelCourseOpen}
                >
                  <Ban />
                  الغاء الدورة
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => setShowConfirmDialog(true)}
                  // loading={isFinishing}
                >
                  إنهاء الدورة
                </Button>
              </>
            )}
        </HStack>
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
              <Text mb={4}>
                هل أنت متأكد من رغبتك في إنهاء الدورة؟ لا يمكن التراجع عن هذا
                الإجراء.
              </Text>
              <Field label="ملاحظات إنهاء الدورة" required>
                <Textarea
                  value={closureNotes}
                  onChange={(e) => setClosureNotes(e.target.value)}
                  placeholder="أدخل ملاحظات إنهاء الدورة..."
                  rows={4}
                />
              </Field>
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
              {
                label: "تاريخ البداية",
                value: details.date,
                editable: true,
                onEdit: onDateEditOpen,
              },
            ].map((item, index) => (
              <GridItem key={index}>
                <HStack justify="space-between" align="center">
                  <Box>
                    <Text fontSize="sm" color="gray.500">
                      {item.label}
                    </Text>
                    <Text fontWeight="medium">{item.value}</Text>
                  </Box>
                  {permission?.permission?.__04__all_tajweed_data_access &&
                    item.editable && (
                      <IconButton
                        size="sm"
                        variant="ghost"
                        onClick={item.onEdit}
                        title="تعديل التاريخ"
                      >
                        <Edit2 size={16} />
                      </IconButton>
                    )}
                </HStack>
              </GridItem>
            ))}
          </Grid>

          {permission?.permission?.__04__all_tajweed_data_access && (
            <Box borderWidth={1} borderRadius="md" p={4}>
              <HStack justify="space-between" align="start" mb={2}>
                <Text fontSize="sm" color="gray.500">
                  ملاحظات
                </Text>
                <IconButton
                  size="sm"
                  variant="ghost"
                  onClick={onNotesEditOpen}
                  title="تعديل الملاحظات"
                >
                  <Edit2 size={16} />
                </IconButton>
              </HStack>
              <Text>{notes || "لا توجد ملاحظات"}</Text>
            </Box>
          )}
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
        <Box borderWidth={1} borderRadius="lg" p={6} overflow="scroll">
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
                  "الإجراءات",
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
                    <Badge
                      colorPalette={getAttendanceStatusColor(
                        student.attendance_status
                      )}
                      px="2"
                    >
                      {student.attendance_status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => openWithdrawalDialog(student)}
                    >
                      <UserMinus size={16} />
                      انسحاب
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      )}

      {/* Cancel Course Dialog */}
      <DialogRoot open={isCancelCourseOpen} onOpenChange={onCancelCourseClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>الغاء الدورة</DialogTitle>
          </DialogHeader>

          <DialogBody>
            <Text mb={4} color="red.500" fontWeight="medium">
              تحذير: سيؤدي إلغاء الدورة إلى إيقاف جميع الأنشطة المتعلقة بها.
            </Text>
            <Field label="سبب الإلغاء" required>
              <Textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="أدخل سبب إلغاء الدورة..."
                rows={3}
              />
            </Field>
            <Field label="ملاحظات إضافية" mt={4}>
              <Textarea
                value={cancelNotes}
                onChange={(e) => setCancelNotes(e.target.value)}
                placeholder="أدخل أي ملاحظات إضافية..."
                rows={3}
              />
            </Field>
          </DialogBody>
          <DialogFooter>
            <HStack gap={3}>
              <Button
                colorScheme="red"
                onClick={handleCancelCourse}
                disabled={!cancelReason.trim()}
              >
                تأكيد الإلغاء
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onCancelCourseClose();
                  setCancelReason("");
                  setCancelNotes("");
                }}
              >
                إلغاء
              </Button>
            </HStack>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      {/* Edit Start Date Dialog */}
      <DialogRoot open={isDateEditOpen} onOpenChange={onDateEditClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل تاريخ بداية الدورة</DialogTitle>
          </DialogHeader>

          <DialogBody>
            <Field label="تاريخ البداية" required>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Field>
          </DialogBody>
          <DialogFooter>
            <HStack gap={3}>
              <Button colorScheme="green" onClick={handleDateSave}>
                حفظ التغييرات
              </Button>
              <Button variant="outline" onClick={onDateEditClose}>
                إلغاء
              </Button>
            </HStack>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      {/* Edit Notes Dialog */}
      <DialogRoot open={isNotesEditOpen} onOpenChange={onNotesEditClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل الملاحظات</DialogTitle>
          </DialogHeader>

          <DialogBody>
            <Field label="الملاحظات">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أدخل الملاحظات..."
                rows={4}
              />
            </Field>
          </DialogBody>
          <DialogFooter>
            <HStack gap={3}>
              <Button colorScheme="green" onClick={handleNotesSave}>
                حفظ التغييرات
              </Button>
              <Button variant="outline" onClick={onNotesEditClose}>
                إلغاء
              </Button>
            </HStack>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      {/* Withdrawal Dialog */}
      <DialogRoot open={isWithdrawalOpen} onOpenChange={onWithdrawalClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد انسحاب الطالب</DialogTitle>
          </DialogHeader>

          <DialogBody>
            <Text mb={4}>
              هل أنت متأكد من رغبتك في تسجيل انسحاب الطالب{" "}
              <Text as="span" fontWeight="bold">
                {selectedStudent?.name}
              </Text>
              ؟
            </Text>
            <Field label="سبب الانسحاب" required>
              <Textarea
                value={withdrawalReason}
                onChange={(e) => setWithdrawalReason(e.target.value)}
                placeholder="أدخل سبب الانسحاب..."
                rows={4}
              />
            </Field>
          </DialogBody>
          <DialogFooter>
            <HStack gap={3}>
              <Button
                colorScheme="red"
                onClick={handleWithdrawal}
                disabled={!withdrawalReason.trim()}
              >
                تأكيد الانسحاب
              </Button>
              <Button variant="outline" onClick={onWithdrawalClose}>
                إلغاء
              </Button>
            </HStack>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </VStack>
  );
}

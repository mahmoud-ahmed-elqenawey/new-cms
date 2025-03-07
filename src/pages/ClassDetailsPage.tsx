import { useState } from "react";
// import { useParams } from "react-router";
import {
  Box,
  Heading,
  Text,
  Badge,
  Flex,
  Button,
  HStack,
  Table,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ArrowRight,
  Users,
  Calendar,
  Check,
  X,
  Plus,
  BookOpen,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Field } from "@/components/ui/field";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
} from "@/components/ui/dialog";
import {
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "@/components/ui/accordion";

interface Student {
  id: string;
  name: string;
  attendance: {
    [key: string]: boolean;
  };
  recitation: {
    [key: string]: {
      level: "excellent" | "good" | "needs-improvement";
      notes?: string;
    };
  };
}

interface Session {
  id: string;
  date: string;
  title: string;
  activities: string;
  departmentNotes: string;
  classNotes: string;
  startTime: string;
  endTime: string;
}

interface ClassDetails {
  id: string;
  name: string;
  teacher: string;
  students: Student[];
  sessions: Session[];
}

interface SessionForm {
  title: string;
  activities: string;
  departmentNotes: string;
  classNotes: string;
}

export default function ClassDetailsPage() {
  //   const { classId } = useParams();
  const navigate = useNavigate();
  const { open, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState<
    "attendance" | "recitation" | "sessions"
  >("attendance");
  const [sessionForm, setSessionForm] = useState<SessionForm>({
    title: "",
    activities: "",
    departmentNotes: "",
    classNotes: "",
  });

  const [classDetails] = useState<ClassDetails>({
    id: "1",
    name: "دورة التجويد المستوى الأول",
    teacher: "أحمد محمد",
    sessions: [
      {
        id: "1",
        date: "2024-02-01",
        title: "مخارج الحروف",
        activities: "تدريب على مخارج الحروف الحلقية",
        departmentNotes: "الطلاب متفاعلون بشكل جيد",
        classNotes: "يحتاج بعض الطلاب إلى تركيز أكثر",
        startTime: "15:00",
        endTime: "17:00",
      },
      {
        id: "2",
        date: "2024-02-04",
        title: "أحكام النون الساكنة",
        activities: "شرح وتطبيق على الإظهار والإدغام",
        departmentNotes: "مستوى الفهم جيد",
        classNotes: "تم إنجاز المطلوب",
        startTime: "15:00",
        endTime: "17:00",
      },
    ],
    students: [
      {
        id: "1",
        name: "محمد عبدالله",
        attendance: {
          "2024-02-01": true,
          "2024-02-04": false,
          "2024-02-08": true,
          "2024-02-11": true,
        },
        recitation: {
          "2024-02-01": { level: "excellent", notes: "ممتاز في مخارج الحروف" },
          "2024-02-04": { level: "good", notes: "تحسن ملحوظ" },
          "2024-02-08": {
            level: "needs-improvement",
            notes: "يحتاج تركيز في القلقلة",
          },
          "2024-02-11": { level: "excellent", notes: "أداء متميز" },
        },
      },
      {
        id: "2",
        name: "أحمد علي",
        attendance: {
          "2024-02-01": true,
          "2024-02-04": true,
          "2024-02-08": false,
          "2024-02-11": true,
        },
        recitation: {
          "2024-02-01": { level: "good", notes: "جيد في المد" },
          "2024-02-04": { level: "excellent", notes: "تحسن كبير في الإدغام" },
          "2024-02-08": { level: "good", notes: "مستوى ثابت" },
          "2024-02-11": {
            level: "needs-improvement",
            notes: "يحتاج مراجعة الإخفاء",
          },
        },
      },
      {
        id: "3",
        name: "عمر خالد",
        attendance: {
          "2024-02-01": true,
          "2024-02-04": true,
          "2024-02-08": true,
          "2024-02-11": false,
        },
        recitation: {
          "2024-02-01": { level: "needs-improvement", notes: "صعوبة في النطق" },
          "2024-02-04": { level: "good", notes: "تحسن ملحوظ" },
          "2024-02-08": { level: "good", notes: "استمرار التحسن" },
          "2024-02-11": { level: "excellent", notes: "أداء ممتاز" },
        },
      },
    ],
  });

  const handleSessionFormChange = (field: keyof SessionForm, value: string) => {
    setSessionForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitSession = () => {
    console.log("Session form submitted:", sessionForm);
    setSessionForm({
      title: "",
      activities: "",
      departmentNotes: "",
      classNotes: "",
    });
    onClose();
  };

  const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.unshift(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const dates = getDates();

  const getAttendanceStatus = (student: Student, date: string) => {
    if (student.attendance[date] === undefined) return null;
    return student.attendance[date];
  };

  const getAttendanceRate = (student: Student) => {
    const attendanceDays = Object.values(student.attendance).filter(
      Boolean
    ).length;
    const totalDays = Object.keys(student.attendance).length;
    return Math.round((attendanceDays / totalDays) * 100);
  };

  const getRecitationLevelColor = (level: string) => {
    switch (level) {
      case "excellent":
        return "green.500";
      case "good":
        return "blue.500";
      case "needs-improvement":
        return "red.500";
      default:
        return "gray.500";
    }
  };

  const getRecitationLevelText = (level: string) => {
    switch (level) {
      case "excellent":
        return "ممتاز";
      case "good":
        return "جيد";
      case "needs-improvement":
        return "يحتاج تحسين";
      default:
        return "—";
    }
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Button
          onClick={() => navigate("/center-groups")}
          variant="ghost"
          colorScheme="green"
        >
          <ArrowRight />
          العودة إلى المجموعات
        </Button>

        <Button onClick={onOpen} colorScheme="green">
          <Plus size={16} />
          فتح جلسة جديدة
        </Button>
      </Flex>

      <Box bg="white" p={6} borderRadius="lg" borderWidth={1} mb={6}>
        <Heading size="lg" mb={4}>
          {classDetails.name}
        </Heading>

        <HStack gap={6} mb={4}>
          <Flex align="center" gap={2}>
            <Users size={20} />
            <Text>المدرس: {classDetails.teacher}</Text>
          </Flex>
          <Badge colorScheme="blue" display="flex" alignItems="center" gap={1}>
            <Calendar size={14} />
            {classDetails.students.length} طالب
          </Badge>
        </HStack>
      </Box>

      <Flex gap={4} mb={4}>
        <Button
          variant={activeTab === "attendance" ? "solid" : "ghost"}
          colorScheme="green"
          onClick={() => setActiveTab("attendance")}
        >
          سجل الحضور
        </Button>
        <Button
          variant={activeTab === "recitation" ? "solid" : "ghost"}
          colorScheme="green"
          onClick={() => setActiveTab("recitation")}
        >
          سجل التسميع
        </Button>
        <Button
          variant={activeTab === "sessions" ? "solid" : "ghost"}
          colorScheme="green"
          onClick={() => setActiveTab("sessions")}
        >
          سجل الجلسات
        </Button>
      </Flex>

      {activeTab === "sessions" ? (
        <Box bg="white" p={6} borderRadius="lg" borderWidth={1}>
          <Heading size="md" mb={6} display="flex" alignItems="center" gap={2}>
            <BookOpen size={20} />
            سجل الجلسات السابقة
          </Heading>

          <AccordionRoot>
            {classDetails.sessions.map((session) => (
              <AccordionItem key={session.id} value={session.id}>
                <AccordionItemTrigger>
                  <Box flex="1" textAlign="right">
                    <Flex justify="space-between" align="center">
                      <Text fontWeight="bold">{session.title}</Text>
                      <HStack gap={4}>
                        <Text fontSize="sm" color="gray.600">
                          {new Date(session.date).toLocaleDateString("ar-SA")}
                        </Text>
                        <Badge
                          colorScheme="blue"
                          display="flex"
                          alignItems="center"
                          gap={1}
                        >
                          <Clock size={14} />
                          {session.startTime} - {session.endTime}
                        </Badge>
                      </HStack>
                    </Flex>
                  </Box>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <VStack align="stretch" gap={4}>
                    <Box>
                      <Text fontWeight="medium" mb={1}>
                        الأنشطة:
                      </Text>
                      <Text color="gray.600">{session.activities}</Text>
                    </Box>

                    <Box>
                      <Text fontWeight="medium" mb={1}>
                        ملاحظات مسؤول القسم:
                      </Text>
                      <Text color="gray.600">{session.departmentNotes}</Text>
                    </Box>

                    <Box>
                      <Text fontWeight="medium" mb={1}>
                        ملاحظات الشعبة:
                      </Text>
                      <Text color="gray.600">{session.classNotes}</Text>
                    </Box>
                  </VStack>
                </AccordionItemContent>
              </AccordionItem>
            ))}
          </AccordionRoot>
        </Box>
      ) : activeTab === "attendance" ? (
        <Box overflowX="auto">
          <Table.Root
            variant="line"
            bg="white"
            borderRadius="lg"
            borderWidth={1}
          >
            <Table.Header position="sticky" top={0} bg="white" zIndex={1}>
              <Table.Row>
                <Table.ColumnHeader>اسم الطالب</Table.ColumnHeader>
                <Table.ColumnHeader>نسبة الحضور</Table.ColumnHeader>
                {dates.map((date) => (
                  <Table.ColumnHeader key={date} textAlign="center">
                    {new Date(date).toLocaleDateString("ar-SA", {
                      month: "numeric",
                      day: "numeric",
                    })}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {classDetails.students.map((student) => (
                <Table.Row key={student.id}>
                  <Table.Cell fontWeight="medium">{student.name}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorScheme={
                        getAttendanceRate(student) >= 75 ? "green" : "red"
                      }
                    >
                      {getAttendanceRate(student)}%
                    </Badge>
                  </Table.Cell>
                  {dates.map((date) => {
                    const status = getAttendanceStatus(student, date);
                    return (
                      <Table.Cell key={date} textAlign="center">
                        {status === null ? (
                          "—"
                        ) : status ? (
                          <Check color="green" size={16} />
                        ) : (
                          <X color="red" size={16} />
                        )}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      ) : (
        <Box overflowX="auto">
          <Table.Root
            variant="line"
            bg="white"
            borderRadius="lg"
            borderWidth={1}
          >
            <Table.Header position="sticky" top={0} bg="white" zIndex={1}>
              <Table.Row>
                <Table.ColumnHeader>اسم الطالب</Table.ColumnHeader>
                {dates.map((date) => (
                  <Table.ColumnHeader key={date} textAlign="center">
                    {new Date(date).toLocaleDateString("ar-SA", {
                      month: "numeric",
                      day: "numeric",
                    })}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {classDetails.students.map((student) => (
                <Table.Row key={student.id}>
                  <Table.Cell fontWeight="medium">{student.name}</Table.Cell>
                  {dates.map((date) => {
                    const recitation = student.recitation[date];
                    return (
                      <Table.Cell key={date} textAlign="center">
                        {recitation ? (
                          <Box>
                            <Badge
                              bg={getRecitationLevelColor(recitation.level)}
                              color="white"
                              title={recitation.notes}
                              cursor="help"
                            >
                              {getRecitationLevelText(recitation.level)}
                            </Badge>
                            {recitation.notes && (
                              <Text fontSize="xs" color="gray.500" mt={1}>
                                {recitation.notes}
                              </Text>
                            )}
                          </Box>
                        ) : (
                          "—"
                        )}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      )}

      <DialogRoot open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>فتح جلسة جديدة</DialogTitle>
          </DialogHeader>
          <DialogCloseTrigger top="0" insetEnd="-12" bg="bg" />

          <DialogBody>
            <VStack gap={4} align="stretch">
              <Field label="عنوان الدرس" required>
                <Textarea
                  value={sessionForm.title}
                  onChange={(e) =>
                    handleSessionFormChange("title", e.target.value)
                  }
                  placeholder="أدخل عنوان الدرس..."
                  rows={2}
                />
              </Field>

              <Field label="الأنشطة" required>
                <Textarea
                  value={sessionForm.activities}
                  onChange={(e) =>
                    handleSessionFormChange("activities", e.target.value)
                  }
                  placeholder="أدخل الأنشطة..."
                  rows={3}
                />
              </Field>

              <Field label="ملاحظات لمسؤول القسم">
                <Textarea
                  value={sessionForm.departmentNotes}
                  onChange={(e) =>
                    handleSessionFormChange("departmentNotes", e.target.value)
                  }
                  placeholder="أدخل ملاحظات لمسؤول القسم..."
                  rows={3}
                />
              </Field>

              <Field label="ملاحظات الشعبة">
                <Textarea
                  value={sessionForm.classNotes}
                  onChange={(e) =>
                    handleSessionFormChange("classNotes", e.target.value)
                  }
                  placeholder="أدخل ملاحظات الشعبة..."
                  rows={3}
                />
              </Field>
            </VStack>
          </DialogBody>

          <DialogFooter>
            <Button
              colorScheme="green"
              onClick={handleSubmitSession}
              disabled={!sessionForm.title || !sessionForm.activities}
            >
              فتح الجلسة
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}

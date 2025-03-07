import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  VStack,
  Badge,
  Flex,
  Input,
  useDisclosure as chakraUseDisclosure,
} from "@chakra-ui/react";
import { Plus, ArrowRight, Users, Book, Clock } from "lucide-react";
import { useNavigate } from "react-router";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import SelectInput from "@/components/core/SelectInput";

interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}

interface Course {
  id: string;
  name: string;
  teacher: string;
  studentCount: number;
  ageRange: {
    min: number;
    max: number;
  };
  schedule: Schedule[];
  moveHistory?: {
    reason: string;
    date: string;
    fromGroup: string;
    toGroup: string;
  }[];
}

interface Group {
  id: string;
  name: string;
  courses: Course[];
}

export default function CenterGroupsPage() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "المجموعة الأولى",
      courses: [
        {
          id: "1",
          name: "دورة التجويد المستوى الأول",
          teacher: "أحمد محمد",
          studentCount: 15,
          ageRange: { min: 8, max: 12 },
          schedule: [
            { day: "الأحد", startTime: "15:00", endTime: "18:00" },
            { day: "الثلاثاء", startTime: "15:00", endTime: "18:00" },
            { day: "الخميس", startTime: "15:00", endTime: "18:00" },
          ],
        },
        {
          id: "2",
          name: "دورة تحسين التلاوة",
          teacher: "محمد علي",
          studentCount: 20,
          ageRange: { min: 10, max: 14 },
          schedule: [
            { day: "الاثنين", startTime: "16:00", endTime: "19:00" },
            { day: "الأربعاء", startTime: "16:00", endTime: "19:00" },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "المجموعة الثانية",
      courses: [
        {
          id: "3",
          name: "دورة حفظ القرآن",
          teacher: "عبدالله أحمد",
          studentCount: 18,
          ageRange: { min: 12, max: 16 },
          schedule: [
            { day: "السبت", startTime: "14:00", endTime: "17:00" },
            { day: "الثلاثاء", startTime: "14:00", endTime: "17:00" },
          ],
        },
      ],
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState<{
    courseId: string;
    fromGroupId: string;
  } | null>(null);

  const [moveReason, setMoveReason] = useState("");
  const [targetGroup, setTargetGroup] = useState("");

  const { open, onOpen, onClose } = chakraUseDisclosure();

  const handleMoveClick = (
    e: React.MouseEvent,
    courseId: string,
    groupId: string
  ) => {
    e.stopPropagation(); // Prevent the card click event
    setSelectedCourse({ courseId, fromGroupId: groupId });
    onOpen();
  };

  const handleMove = () => {
    if (!selectedCourse || !targetGroup || !moveReason) return;

    setGroups((prevGroups) => {
      const newGroups = [...prevGroups];

      const sourceGroup = newGroups.find(
        (g) => g.id === selectedCourse.fromGroupId
      );
      const targetGroupObj = newGroups.find((g) => g.id === targetGroup);

      if (!sourceGroup || !targetGroupObj) return prevGroups;

      const courseIndex = sourceGroup.courses.findIndex(
        (c) => c.id === selectedCourse.courseId
      );
      const course = sourceGroup.courses[courseIndex];

      if (course) {
        const moveHistoryEntry = {
          reason: moveReason,
          date: new Date().toISOString(),
          fromGroup: sourceGroup.name,
          toGroup: targetGroupObj.name,
        };

        sourceGroup.courses.splice(courseIndex, 1);

        targetGroupObj.courses.push({
          ...course,
          moveHistory: [...(course.moveHistory || []), moveHistoryEntry],
        });
      }

      return newGroups;
    });

    setMoveReason("");
    setTargetGroup("");
    onClose();
  };

  const handleClassClick = (courseId: string) => {
    navigate(`/center-groups/class/${courseId}`);
  };

  return (
    <Box p={4}>
      <Heading mb={6} display="flex" alignItems="center" gap={2}>
        <Book />
        إدارة المجموعات والفصول
      </Heading>

      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {groups.map((group) => (
          <Box
            key={group.id}
            bg="white"
            p={4}
            borderRadius="lg"
            borderWidth={1}
            borderColor="gray.200"
          >
            <Heading size="md" mb={4}>
              {group.name}
            </Heading>

            <VStack align="stretch" gap={4}>
              {group.courses.map((course) => (
                <Box
                  key={course.id}
                  p={4}
                  borderRadius="md"
                  bg="gray.50"
                  _hover={{ bg: "gray.100" }}
                  transition="background-color 0.2s"
                  cursor="pointer"
                  onClick={() => handleClassClick(course.id)}
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Heading size="sm">{course.name}</Heading>
                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme="green"
                      onClick={(e) => handleMoveClick(e, course.id, group.id)}
                    >
                      <ArrowRight />
                      نقل
                    </Button>
                  </Flex>

                  <Text fontSize="sm" color="gray.600" mb={2}>
                    المدرس: {course.teacher}
                  </Text>

                  <Flex gap={2} mb={3}>
                    <Badge
                      colorScheme="blue"
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Users size={14} />
                      {course.studentCount} طالب
                    </Badge>
                    <Badge colorScheme="purple">
                      {course.ageRange.min}-{course.ageRange.max} سنة
                    </Badge>
                  </Flex>

                  <Box borderTop="1px" borderColor="gray.200" my={2} />

                  <VStack align="stretch" gap={1} mt={2}>
                    <Flex align="center" gap={2} mb={1}>
                      <Clock size={14} />
                      <Text fontSize="sm" fontWeight="medium">
                        أوقات الدوام:
                      </Text>
                    </Flex>
                    {course.schedule.map((time, index) => (
                      <Text key={index} fontSize="sm" color="gray.600">
                        {time.day} {time.startTime} - {time.endTime}
                      </Text>
                    ))}
                  </VStack>

                  {course.moveHistory && course.moveHistory.length > 0 && (
                    <Box mt={3} pt={2} borderTop="1px" borderColor="gray.200">
                      <Text fontSize="xs" color="gray.500">
                        آخر نقل:{" "}
                        {new Date(
                          course.moveHistory[course.moveHistory.length - 1].date
                        ).toLocaleDateString("ar-SA")}
                      </Text>
                    </Box>
                  )}
                </Box>
              ))}

              <Button variant="outline" colorScheme="green" size="sm" w="full">
                <Plus size={16} />
                إضافة فصل جديد
              </Button>
            </VStack>
          </Box>
        ))}

        <Box
          bg="gray.50"
          p={4}
          borderRadius="lg"
          borderWidth={2}
          borderStyle="dashed"
          borderColor="gray.300"
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="200px"
          cursor="pointer"
          _hover={{ bg: "gray.100" }}
          transition="background-color 0.2s"
        >
          <VStack gap={2}>
            <Plus size={24} color="gray" />
            <Text color="gray.600">إضافة مجموعة جديدة</Text>
          </VStack>
        </Box>
      </Grid>

      <DialogRoot open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>نقل الفصل إلى مجموعة أخرى</DialogTitle>
          </DialogHeader>
          <DialogCloseTrigger top="0" insetEnd="-12" bg="bg" />

          <DialogBody>
            <VStack gap={4} align="stretch">
              <SelectInput
                label="المجموعة المستهدفة"
                data={groups
                  .filter((g) => g.id !== selectedCourse?.fromGroupId)
                  .map((g) => ({ label: g.name, value: g.id }))}
                defaultValue={[targetGroup]}
                onValueChange={setTargetGroup}
              />

              <Field label="سبب النقل">
                <Input
                  value={moveReason}
                  onChange={(e) => setMoveReason(e.target.value)}
                  placeholder="اكتب سبب نقل الفصل..."
                />
              </Field>
            </VStack>
          </DialogBody>

          <DialogFooter>
            <Button
              colorScheme="green"
              onClick={handleMove}
              disabled={!targetGroup || !moveReason}
            >
              تأكيد النقل
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}

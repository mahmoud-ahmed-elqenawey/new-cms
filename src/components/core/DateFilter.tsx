// import React from "react";
// import {
//   Box,
//   Flex,
//   FormControl,
//   FormLabel,
//   Input,
//   Select,
//   Grid,
//   GridItem,
// } from "@chakra-ui/react";

interface DateFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  startLabel: string;
  endLabel: string;
  isFinished?: string;
  setIsFinished?: (value: string) => void;
}

export default function DateFilter({}: //   startDate,
//   endDate,
//   onStartDateChange,
//   onEndDateChange,
//   startLabel,
//   endLabel,
//   isFinished,
//   setIsFinished,
DateFilterProps) {
  return "";
  //   return (
  //     <Flex align="center" gap="4">
  //       <Grid
  //         templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }}
  //         gap="4"
  //         flex="1"
  //       >
  //         <GridItem>
  //           <FormControl position="relative">
  //             <FormLabel
  //               position="absolute"
  //               top="-2"
  //               right="3"
  //               bg="white"
  //               px="2"
  //               fontSize="xs"
  //               fontWeight="medium"
  //               color="gray.600"
  //             >
  //               {startLabel}
  //             </FormLabel>
  //             <Input
  //               type="date"
  //               value={startDate}
  //               onChange={(e) => onStartDateChange(e.target.value)}
  //               px="3"
  //               py="2"
  //               borderColor="gray.300"
  //               borderRadius="lg"
  //               _focus={{
  //                 outline: "none",
  //                 ring: "2px",
  //                 ringColor: "#67B37D",
  //                 borderColor: "transparent",
  //               }}
  //             />
  //           </FormControl>
  //         </GridItem>
  //         <GridItem>
  //           <FormControl position="relative">
  //             <FormLabel
  //               position="absolute"
  //               top="-2"
  //               right="3"
  //               bg="white"
  //               px="2"
  //               fontSize="xs"
  //               fontWeight="medium"
  //               color="gray.600"
  //             >
  //               {endLabel}
  //             </FormLabel>
  //             <Input
  //               type="date"
  //               value={endDate}
  //               min={startDate}
  //               onChange={(e) => onEndDateChange(e.target.value)}
  //               px="3"
  //               py="2"
  //               borderColor="gray.300"
  //               borderRadius="lg"
  //               _focus={{
  //                 outline: "none",
  //                 ring: "2px",
  //                 ringColor: "#67B37D",
  //                 borderColor: "transparent",
  //               }}
  //             />
  //           </FormControl>
  //         </GridItem>
  //         {isFinished && (
  //           <GridItem>
  //             <FormControl position="relative">
  //               <FormLabel
  //                 position="absolute"
  //                 top="-2"
  //                 right="3"
  //                 bg="white"
  //                 px="2"
  //                 fontSize="xs"
  //                 fontWeight="medium"
  //                 color="gray.600"
  //               >
  //                 الدورات
  //               </FormLabel>
  //               <Select
  //                 name="course_type"
  //                 id="course_type"
  //                 pl="4"
  //                 pr="10"
  //                 py="2"
  //                 borderColor="gray.300"
  //                 borderRadius="lg"
  //                 _focus={{
  //                   outline: "none",
  //                   ring: "2px",
  //                   ringColor: "#67B37D",
  //                   borderColor: "transparent",
  //                 }}
  //                 onChange={(e) => {
  //                   setIsFinished && setIsFinished(e.target.value);
  //                 }}
  //                 value={isFinished}
  //               >
  //                 <option value="">الكل</option>
  //                 {["true", "false"].map((type: string, idx: number) => (
  //                   <option key={idx} value={type}>
  //                     {type === "true" ? "تم الانتهاء" : "غير مكتمل"}
  //                   </option>
  //                 ))}
  //               </Select>
  //             </FormControl>
  //           </GridItem>
  //         )}
  //       </Grid>
  //     </Flex>
  //   );
}

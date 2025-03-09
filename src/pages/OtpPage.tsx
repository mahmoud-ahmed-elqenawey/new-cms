import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Field } from "@/components/ui/field";

import { storeTokens } from "@/services/auth";
import useAuth from "@/store/useAuth";
import {
  Alert,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  // VStack,
} from "@chakra-ui/react";
import { useCustomPost } from "@/hooks/useMutation";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PinInput } from "@/components/ui/pin-input";

type Inputs = {
  pin: string;
};
const schema = yup.object({
  pin: yup.string().required(),
});

const OtpPage = () => {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useAuth();
  const [error, setError] = useState();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const { mutateAsync } = useCustomPost("account/dashboard/login/");
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutateAsync({
      pin: data.pin,
    }).then((res) => {
      console.log("res", res);
      if (res.status) {
        storeTokens(res.data.tokens.access, navigate, setIsAuthenticated);
      } else {
        setError(res.error);
      }
    });
    console.log(data);
  };

  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center">
      <Box bg="white" p={8} borderRadius="lg" maxWidth="400px" width="100%">
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          OTP
        </Heading>
        <Text textAlign="center" mb={6}>
          قم بادخال الكود التفعيل
        </Text>

        {error && (
          <Alert.Root status="error" mb="6">
            <Alert.Indicator />
            <Alert.Title>{error}</Alert.Title>
          </Alert.Root>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            invalid={errors.pin?.type === "required" ? true : false}
            errorText={
              errors.pin?.type === "required"
                ? "هذا الحقل مطلوب"
                : errors.pin?.message
            }
            required
            label="كود التفعيل"
            mb={4}
          >
            <Controller
              control={control}
              name="pin"
              render={({ field }: { field: any }) => (
                <PinInput
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                />
              )}
            />
            {/* <Text color="gray.500" fontSize="sm">
              اكتب الكود من اتجاه اليمين
            </Text> */}
          </Field>

          <Button type="submit" colorScheme="blue" width="full" mb={4}>
            تسجيل الدخول
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default OtpPage;

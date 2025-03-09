import { useForm, SubmitHandler } from "react-hook-form";
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
  Input,
  // Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { useCustomPost } from "@/hooks/useMutation";
import { useState } from "react";
import { useNavigate } from "react-router";
type Inputs = {
  number: string;
  password: string;
};
const schema = yup.object({
  number: yup.string().required(),
  password: yup.string().required(),
});

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [error, setError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const { mutateAsync } = useCustomPost("account/dashboard/login/");
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutateAsync({ mobile_number: data.number, password: data.password }).then(
      (res) => {
        console.log("res", res);
        if (res.status) {
          storeTokens(res.data.tokens.access, navigate, setIsAuthenticated);
        } else {
          setError(res.error);
        }
      }
    );
    console.log(data);
  };

  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center">
      <Box bg="white" p={8} borderRadius="lg" maxWidth="400px" width="100%">
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          هل نسيت كلمة المرور
        </Heading>
        <Text textAlign="center" mb={6}>
          قم بادخال رقم الهاتف وسيتم ارسال كود التفعيل
        </Text>

        {error && (
          <Alert.Root status="error" mb="6">
            <Alert.Indicator />
            <Alert.Title>{error}</Alert.Title>
          </Alert.Root>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Field
            invalid={errors.number?.type === "required" ? true : false}
            errorText={
              errors.number?.type === "required"
                ? "هذا الحقل مطلوب"
                : errors.number?.message
            }
            required
            label="رقم الهاتف"
            mb={4}
          >
            <Input
              {...register("number")}
              type="tel"
              placeholder="قم بادخال رقم الهاتف"
            />
          </Field>

          <Button type="submit" colorScheme="blue" width="full" mb={4}>
            ارسال كود التفعيل
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default ForgotPasswordPage;

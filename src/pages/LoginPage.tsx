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
  Link as ChakraLink,
  Text,
  // VStack,
} from "@chakra-ui/react";
import { useCustomPost } from "@/hooks/useMutation";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
type Inputs = {
  number: string;
  password: string;
};
const schema = yup.object({
  number: yup.string().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
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
    // console.log(data);
  };

  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center">
      <Box bg="white" p={8} borderRadius="lg" maxWidth="400px" width="100%">
        {/* logo */}
        <Flex align="center" justifyContent="center" mb="6">
          <svg
            height={28}
            viewBox="0 0 143 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Logo</title>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.127 0C15.466 0 11.2287 1.69492 7.83887 4.23729L30.9321 31.9915L49.788 17.7966C48.9406 7.83898 40.466 0 30.0846 0"
              fill="var(--chakra-colors-color-palette-solid)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M30.0847 50C41.1017 50 50 41.1017 50 30.0847V29.0254L32.839 41.7373C30.9322 43.2203 28.178 42.7966 26.6949 41.1017L2.11864 11.4407C0.847458 13.983 0 16.9491 0 19.9152V29.8729C0 40.8898 8.89831 49.7881 19.9153 49.7881"
              fill="var(--chakra-colors-color-palette-emphasized)"
            />
            <path
              d="M67.736 37V11.8H71.876V37H67.736ZM70.58 37V33.22H83.756V37H70.58ZM93.2313 37.36C91.5513 37.36 90.0273 36.964 88.6593 36.172C87.2913 35.356 86.1993 34.264 85.3833 32.896C84.5913 31.528 84.1953 30.004 84.1953 28.324C84.1953 26.644 84.5913 25.132 85.3833 23.788C86.1993 22.444 87.2913 21.376 88.6593 20.584C90.0273 19.768 91.5513 19.36 93.2313 19.36C94.9353 19.36 96.4713 19.756 97.8393 20.548C99.2073 21.34 100.287 22.42 101.079 23.788C101.895 25.132 102.303 26.644 102.303 28.324C102.303 30.004 101.895 31.528 101.079 32.896C100.287 34.264 99.2073 35.356 97.8393 36.172C96.4713 36.964 94.9353 37.36 93.2313 37.36ZM93.2313 33.544C94.2153 33.544 95.0793 33.328 95.8233 32.896C96.5913 32.44 97.1793 31.816 97.5873 31.024C98.0193 30.232 98.2353 29.332 98.2353 28.324C98.2353 27.316 98.0193 26.428 97.5873 25.66C97.1553 24.892 96.5673 24.292 95.8233 23.86C95.0793 23.404 94.2153 23.176 93.2313 23.176C92.2713 23.176 91.4073 23.404 90.6393 23.86C89.8953 24.292 89.3073 24.892 88.8753 25.66C88.4673 26.428 88.2633 27.316 88.2633 28.324C88.2633 29.332 88.4673 30.232 88.8753 31.024C89.3073 31.816 89.8953 32.44 90.6393 32.896C91.4073 33.328 92.2713 33.544 93.2313 33.544ZM111.716 44.56C109.892 44.56 108.296 44.224 106.928 43.552C105.56 42.904 104.456 41.98 103.616 40.78L106.208 38.188C106.904 39.052 107.696 39.7 108.584 40.132C109.472 40.564 110.54 40.78 111.788 40.78C113.348 40.78 114.584 40.372 115.496 39.556C116.408 38.764 116.864 37.672 116.864 36.28V32.032L117.548 28.216L116.864 24.364V19.72H120.824V36.28C120.824 37.936 120.44 39.376 119.672 40.6C118.904 41.848 117.836 42.82 116.468 43.516C115.1 44.212 113.516 44.56 111.716 44.56ZM111.536 36.64C110 36.64 108.608 36.268 107.36 35.524C106.136 34.756 105.164 33.712 104.444 32.392C103.748 31.072 103.4 29.596 103.4 27.964C103.4 26.332 103.748 24.868 104.444 23.572C105.164 22.276 106.136 21.256 107.36 20.512C108.608 19.744 110 19.36 111.536 19.36C112.904 19.36 114.104 19.636 115.136 20.188C116.168 20.74 116.972 21.508 117.548 22.492C118.124 23.452 118.412 24.58 118.412 25.876V30.124C118.412 31.396 118.112 32.524 117.512 33.508C116.936 34.492 116.132 35.26 115.1 35.812C114.068 36.364 112.88 36.64 111.536 36.64ZM112.328 32.896C113.288 32.896 114.128 32.692 114.848 32.284C115.568 31.876 116.12 31.312 116.504 30.592C116.912 29.848 117.116 28.984 117.116 28C117.116 27.016 116.912 26.164 116.504 25.444C116.12 24.7 115.568 24.124 114.848 23.716C114.128 23.308 113.288 23.104 112.328 23.104C111.368 23.104 110.516 23.308 109.772 23.716C109.052 24.124 108.488 24.7 108.08 25.444C107.672 26.164 107.468 27.016 107.468 28C107.468 28.96 107.672 29.812 108.08 30.556C108.488 31.3 109.052 31.876 109.772 32.284C110.516 32.692 111.368 32.896 112.328 32.896ZM132.063 37.36C130.383 37.36 128.859 36.964 127.491 36.172C126.123 35.356 125.031 34.264 124.215 32.896C123.423 31.528 123.027 30.004 123.027 28.324C123.027 26.644 123.423 25.132 124.215 23.788C125.031 22.444 126.123 21.376 127.491 20.584C128.859 19.768 130.383 19.36 132.063 19.36C133.767 19.36 135.303 19.756 136.671 20.548C138.039 21.34 139.119 22.42 139.911 23.788C140.727 25.132 141.136 26.644 141.136 28.324C141.136 30.004 140.727 31.528 139.911 32.896C139.119 34.264 138.039 35.356 136.671 36.172C135.303 36.964 133.767 37.36 132.063 37.36ZM132.063 33.544C133.047 33.544 133.911 33.328 134.655 32.896C135.423 32.44 136.011 31.816 136.419 31.024C136.851 30.232 137.067 29.332 137.067 28.324C137.067 27.316 136.851 26.428 136.419 25.66C135.987 24.892 135.399 24.292 134.655 23.86C133.911 23.404 133.047 23.176 132.063 23.176C131.103 23.176 130.239 23.404 129.471 23.86C128.727 24.292 128.139 24.892 127.707 25.66C127.299 26.428 127.095 27.316 127.095 28.324C127.095 29.332 127.299 30.232 127.707 31.024C128.139 31.816 128.727 32.44 129.471 32.896C130.239 33.328 131.103 33.544 132.063 33.544Z"
              fill="var(--chakra-colors-fg)"
            />
          </svg>
        </Flex>
        {/* logo */}

        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          مرحباً بعودتك
        </Heading>
        <Text textAlign="center" mb={6}>
          قم بتسجيل الدخول بالهاتف وكلمة المرور
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

          <Field
            invalid={errors.password?.type === "required" ? true : false}
            errorText={
              errors.password?.type === "required"
                ? "هذا الحقل مطلوب"
                : errors.password?.message
            }
            required
            label="كلمة المرور"
            mb={4}
          >
            <Input
              {...register("password")}
              type="password"
              placeholder="قم بادخال كلمة المرور"
            />
          </Field>

          <Flex justifyContent="flex-end" alignItems="center" mb={6}>
            {/* <Checkbox>تذكرني</Checkbox> */}
            <ChakraLink asChild color="blue.500">
              <Link to="/forgot-password">هل نسيت كلة المرور؟</Link>
            </ChakraLink>
          </Flex>

          <Button type="submit" colorScheme="blue" width="full" mb={4}>
            تسجيل الدخول
          </Button>
        </form>

        {/* <Button variant="outline" colorScheme="blue" width="full" mb={4}>
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            width="16"
          />
          تسجيل الدخول باستخدام جوجل
        </Button> */}

        {/* <Text textAlign="center" mt={4}>
          ليس لديك حساب؟{" "}
          <ChakraLink asChild color="blue.500">
            <Link to="/register">انشاء حساب</Link>
          </ChakraLink>
        </Text> */}
      </Box>
    </Flex>
  );
};

export default LoginPage;

"use client";

import axios from "axios";
import Image from "next/image";

export default function Home() {
  function SignIn() {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<TSignInForm>({
      resolver: zodResolver(SignInValidation),
      mode: "onChange",
    });

    const googleSignIn = async () => {
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    };

    const credentialSignIn = async (values: TSignInForm) => {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/dashboard",
      });
    };

    return (
      <Flex
        minH={"90dvh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={4} maxW={"lg"} py={12} px={6}>
          <Box
            rounded={"2xl"}
            border={"1px solid #e4e4e7"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Heading fontSize={"2xl"} mb={4}>
              Zaloguj się
            </Heading>

            <Stack spacing={4} w={{ base: 300, sm: 400 }}>
              {error && (
                <Box
                  w="100%"
                  p={4}
                  border="1px"
                  borderColor="red.400"
                  rounded={10}
                  color="red.600"
                  fontWeight="semibold"
                >
                  {error}
                </Box>
              )}
              <form onSubmit={handleSubmit(credentialSignIn)}>
                <Stack spacing={4} w={{ base: 300, sm: 400 }}>
                  <FormControl id="email" isInvalid={!!errors.email}>
                    <FormLabel fontSize="md">Email</FormLabel>
                    <Input
                      placeholder="Wpisz adres email"
                      focusBorderColor="orange.400"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email jest wymagany",
                        },
                      })}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl id="password" isInvalid={!!errors.password}>
                    <FormLabel fontSize="md">Hasło</FormLabel>
                    <Input
                      type="password"
                      placeholder="Wpisz hasło"
                      focusBorderColor="orange.400"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Hasło jest wymagane",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.password?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <Button
                    type="submit"
                    mt={2}
                    bg="orange.400"
                    _hover={{
                      bg: "#DD6B20",
                    }}
                    textColor="white"
                    isLoading={isSubmitting}
                  >
                    Zaloguj się
                  </Button>
                </Stack>
              </form>

              <Stack spacing={6}>
                <HStack>
                  <Divider borderColor="gray.200" />
                  <Text
                    minW={36}
                    fontSize={{ base: "sm", sm: "md" }}
                    align="center"
                  >
                    lub kontynuuj z
                  </Text>
                  <Divider borderColor="gray.200" />
                </HStack>

                <Button
                  leftIcon={<Icon as={FaGoogle} />}
                  type={"button"}
                  onClick={googleSignIn}
                  border={"1px solid #e4e4e7"}
                  bg={"white"}
                  _hover={{
                    bg: "#f4f4f5",
                  }}
                >
                  Google
                </Button>
              </Stack>
              <Stack pt={2}>
                <Text fontSize={{ base: "sm", sm: "md" }} align={"center"}>
                  Nie masz jeszcze konta?{" "}
                  <Link
                    href="/sign-up"
                    fontWeight={"semibold"}
                    color={"orange.500"}
                  >
                    Zarejestruj się
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
}

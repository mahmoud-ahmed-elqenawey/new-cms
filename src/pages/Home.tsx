import { Button, Heading, Text } from "@chakra-ui/react";
import Todos from "../components/home/Todos";
import useCounter from "../store/Counter";

const Home = () => {
  const { count, inc } = useCounter();

  console.log("first");
  return (
    <div>
      <Heading as="h1" size="2xl">
        home
      </Heading>

      <Heading as="h2" size="lg">
        global state{" "}
      </Heading>
      <Text textStyle="2xl">{count}</Text>
      <Button onClick={inc}>one up</Button>

      {/* tods */}

      <Heading as="h2" size="lg">
        react query
      </Heading>

      <Todos />
    </div>
  );
};

export default Home;

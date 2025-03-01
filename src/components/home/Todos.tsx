import { useCustomAdd } from "@/hooks/useMutation";
import { useCustomQuery } from "@/hooks/useQuery";
import { Button } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// todo type
type Todo = {
  id: number;
  userId: number;
  todo: string;
};

const Todos = () => {
  const { data, isPending, error } = useCustomQuery(["todos"], "todos?limit=3");

  const addTodo = useCustomAdd("todos/add", ["todos"]);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <ul>
        {data?.todos.map((todo: Todo) => (
          <li key={todo.id}>{todo.todo}</li>
        ))}
      </ul>

      <Button
        onClick={() => {
          addTodo.mutate({
            id: Date.now(),
            userId: 1,
            todo: "Do Laundry",
          });
        }}
      >
        Add Todo
      </Button>
    </div>
  );
};

export default Todos;

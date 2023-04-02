import { api } from "@/utils/api";
import { useState } from "react";

interface Props {
  setActiveTab: (val: number) => void
}

const Form = ({ setActiveTab }: Props) => {
  const ctx = api.useContext();
  const [ todo, setTodo ] = useState('');

  const { mutate, isLoading } = api.todos.create.useMutation({
    async onSuccess() {
      setTodo('');
      await ctx.todos.getAll.invalidate();
      setActiveTab(0);
    },
    
  })

  const handleAddTodo = () => {
    todo.trim() && mutate({ content: todo })
  }

  return (
    <div className="flex gap-2 mb-10">
      <input
        type="text"
        placeholder="Type here"
        className="input w-full"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="btn" onClick={handleAddTodo} disabled={isLoading}>
        Add todo
      </button>
    </div>
  )
}

export default Form;

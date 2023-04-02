import { api } from "@/utils/api"
import { type Todo } from "@prisma/client"

interface Props {
  item: Todo
}

const ListItem = ({ item }: Props) => {
  const ctx = api.useContext();

  const { mutate, isLoading: isDeleting} = api.todos.deleteOne.useMutation({
    onSuccess: async () => {
      await ctx.todos.getAll.invalidate();
    }
  })

  const { mutate: update, isLoading: isUpdating} = api.todos.update.useMutation({
    onSuccess: async () => {
      await ctx.todos.getAll.invalidate();
    }
  })

  const handleChange = () => {
    update({
      id: item.id,
      done: !item.done,
    })
  }

  const handleDelete = () => {
    mutate({ id: item.id })
  }

  return (
    <div className="form-control bg-white rounded-lg p-2">
      <label className="label cursor-pointer flex justify-between items-center">
        <div className="flex justify-center gap-3">
          <input
            type="checkbox"
            checked={item.done}
            onChange={handleChange} 
            className="checkbox checkbox-primary"
            disabled={isUpdating}
          />
          <span className={`label-text font-semibold ${item.done ? 'line-through' : ''}`}>
            {item.content}
          </span> 
        </div>
        <button
          className="btn btn-sm"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </label>
    </div>
  )
}

export default ListItem
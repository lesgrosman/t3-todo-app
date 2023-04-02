import { api } from "@/utils/api";
import ListItem from "./ListItem";
import Loading from "./Loading";

const tabs = ["All", "Active", "Finished"]

interface Props {
  activeTab: number
  setActiveTab: (val: number) => void
}

const List = ({ activeTab, setActiveTab }: Props) => {
  const ctx = api.useContext();

  const { mutate, isLoading: isDeleting } = api.todos.deleteDone.useMutation({
    onSuccess: async () => {
      await ctx.todos.getAll.invalidate();
    }
  });

  const { data, isLoading } = api.todos.getAll.useQuery({
    done: activeTab === 2 ? true : activeTab === 1 ? false : undefined
  });

  if (!data) {
    return null
  }

  const handleDeleteDone = () => {
    data.some(item => item.done) && mutate()
  }

  const itemsLeft = data.filter(item => !item.done).length

  console.log(isLoading)

  return (
    <div>
      <div className="flex flex-col gap-2 mb-4 h-96 overflow-y-scroll">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {data.map(todo => (
              <ListItem key={todo.id} item={todo} />
            ))}
          </>
        )}
      </div>
      <div className="flex justify-between items-center">
        <span>{itemsLeft} items left</span>
        <div className="tabs tabs-boxed">
          {tabs.map((tab, i) => (
            <a
              key={tab}
              className={`tab ${i === activeTab ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </a> 
          ))}
        </div>
        <button
          className="btn-ghost p-2 rounded-lg"
          onClick={handleDeleteDone}
          disabled={isDeleting}
        >
          Clear all finished
        </button>
      </div>
    </div>
  )
}

export default List
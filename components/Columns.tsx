import {PlusCircleIcon} from "@heroicons/react/24/solid";
import {Draggable, Droppable} from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import {useBoardStore} from "@/store/BoardStore";
import {useModalStore} from "@/store/ModalStore";

type props = {
    id: TypedColumns;
    todos: Todo[];
    index: number;
};

const idToColumnText: {
    [key in TypedColumns]: string;
} = {
    todo: "To do",
    inprogress: "In progress",
    done: "Done",
};

export default function Columns({id, todos, index}: props) {
    const [searchString, setNewTaskType] = useBoardStore((state) => [state.searchString, state.setNewTaskType]);
    const [isOpen, openModal] = useModalStore((state) => [state.isOpen, state.openModal]);
    const handleAddTodo = () => {
        setNewTaskType(id);
        openModal();
    };
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                    <Droppable droppableId={index.toString()} type="card">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`pb-2 p-2 rounded-2xl shadow-sm ${
                                    snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                                }`}
                            >
                                <h2 className="flex justify-between p-2 text-xl font-bold">
                                    {idToColumnText[id]}
                                    <span className="px-2 py-1 text-sm font-normal text-gray-500 bg-gray-200 rounded-full">
                                        {!searchString
                                            ? todos.length
                                            : todos.filter((todo) =>
                                                  todo.title.toLowerCase().includes(searchString.toLowerCase()),
                                              ).length}
                                    </span>
                                </h2>
                                <div className="p-2 space-y-2 ">
                                    {todos.map((todo, index) => {
                                        if (
                                            searchString &&
                                            !todo.title.toLowerCase().includes(searchString.toLowerCase())
                                        )
                                            return null;

                                        return (
                                            <Draggable draggableId={todo.$id} index={index} key={todo.$id}>
                                                {(provided) => (
                                                    <TodoCard
                                                        todo={todo}
                                                        index={index}
                                                        id={id}
                                                        innerRef={provided.innerRef}
                                                        draggableProps={provided.draggableProps}
                                                        dragHandleProps={provided.dragHandleProps}
                                                    ></TodoCard>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}

                                    <div className="flex items-center justify-center p-2">
                                        <button className="text-green-500 hover:text-green-600">
                                            <PlusCircleIcon onClick={handleAddTodo} className="h-10 w-100" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
}

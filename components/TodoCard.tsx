"use client";
import {getUrl} from "@/lib/getUrl";
import {useBoardStore} from "@/store/BoardStore";
import {XCircleIcon} from "@heroicons/react/24/solid";
import Image from "next/image";
import {useEffect, useState} from "react";
import {DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps} from "react-beautiful-dnd";

type Props = {
    todo: Todo;
    index: number;
    id: TypedColumns;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

export default function TodoCard({todo, index, id, innerRef, dragHandleProps, draggableProps}: Props) {
    const deleteTask = useBoardStore((state) => state.deleteTask);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (todo.image) {
            const fetchImage = async () => {
                const url = await getUrl(todo.image!);
                if (url) {
                    setImageUrl(url.toString());
                }
            };
            fetchImage();
        }
    }, [todo]);
    return (
        <div
            className="space-y-2 bg-white rounded-md shadow-md"
            {...dragHandleProps}
            {...draggableProps}
            ref={innerRef}
        >
            <div className="flex items-center justify-between p-5">
                <p>{todo.title}</p>
                <button onClick={() => deleteTask(index, todo, id)} className="text-red-500 hover:text-red-600">
                    <XCircleIcon className="w-8 h-8 ml-5" />
                </button>
            </div>
            {/* Add image */}
            {imageUrl && (
                <div className="relative w-full h-full">
                    <Image
                        src={imageUrl}
                        alt="Task image"
                        width={400}
                        height={200}
                        className="object-contain w-full required-b-md"
                    />
                </div>
            )}
        </div>
    );
}

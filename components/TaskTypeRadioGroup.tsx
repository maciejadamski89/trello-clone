"use client";
import {useState} from "react";
import {RadioGroup} from "@headlessui/react";
import {useBoardStore} from "@/store/BoardStore";
import {CheckCircleIcon} from "@heroicons/react/24/solid";

const types = [
    {
        id: "todo",
        name: "Todo",
        description: "Tasks that need to be done",
        color: "bg-red-500",
    },
    {
        id: "inprogress",
        name: "In Progress",
        description: "Tasks that are in progress",
        color: "bg-orange-500",
    },
    {
        id: "done",
        name: "Done",
        description: "Tasks that are done",
        color: "bg-green-500",
    },
];

export default function TaskTypeRadioGroup() {
    const [newTaskType, setNewTaskType] = useBoardStore((state) => [state.newTaskType, state.setNewTaskType]);

    return (
        <div className="w-full py-5">
            <div className="w-full max-w-md mx-auto">
                <RadioGroup value={newTaskType} onChange={(e) => setNewTaskType(e)}>
                    <div className="space-y-2">
                        {types.map((type) => (
                            <RadioGroup.Option
                                key={type.id}
                                value={type.id}
                                className={({active, checked}) =>
                                    `${
                                        active
                                            ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
                                            : ""
                                    }
                            ${checked ? `${type.color} bg-opacity-75 text-white` : "bg-white"}
                            relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none
                            }`
                                }
                            >
                                {({active, checked}) => (
                                    <>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center">
                                                <div className="text-sm">
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className={`font-medium  ${
                                                            checked ? "text-white" : "text-gray-900"
                                                        }`}
                                                    >
                                                        {type.name}
                                                    </RadioGroup.Label>
                                                    <RadioGroup.Description
                                                        as="span"
                                                        className={`inline ${checked ? "text-white" : "text-gray-500"}`}
                                                    >
                                                        <span>{type.description}</span>
                                                    </RadioGroup.Description>
                                                </div>
                                            </div>
                                            {checked && (
                                                <div className="flex-shrink-0 text-white">
                                                    <CheckCircleIcon className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
}

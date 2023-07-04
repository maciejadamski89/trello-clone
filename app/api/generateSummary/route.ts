import openai from "@/openai";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const {todo} = await request.json();

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: "system",
                content:
                    "When responding, welcome the user always as Mr.Sony and say welcome to the PAPAFAM Todo App!. Limit the response to 200 characters",
            },
            {
                role: "user",
                content: `Hi there, provide a summary of the followiung todos. Counbt how many todos are in each category such as Todo, In Progress, and Done.
                    Tell user to have a productive day.
                    Here is the data: ${JSON.stringify(todo)} `,
            },
        ],
    });

    const {data} = response;

    return NextResponse.json(data.choices[0].message);
}

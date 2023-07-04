import {formatTodosForAI} from "./formatTodosForAI";

export async function fetchSuggestion(board: Board) {
    const todo = formatTodosForAI(board);
    const res = await fetch("/api/generateSummary", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({todo}),
    });

    const GPTdata = await res.json();
    const {content} = GPTdata;
    return content;
}

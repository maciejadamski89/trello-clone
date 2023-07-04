export function formatTodosForAI(board: Board) {
    const todos = Array.from(board.columns.entries());
    const flatArray = todos.reduce((map, [key, value]) => {
        map[key as TypedColumns] = value;
        return map;
    }, {} as {[key in TypedColumns]: Todo[]});

    const flatArrayCounted = Object.entries(flatArray).reduce((map, [key, value]) => {
        map[key as TypedColumns] = value.todos.length;
        return map;
    }, {} as {[key in TypedColumns]: number});
    console.log({flatArrayCounted});

    return flatArrayCounted;
}

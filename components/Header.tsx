"use client";
import Image from "next/image";
import {MagnifyingGlassIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import {useBoardStore} from "@/store/BoardStore";
import {useEffect, useState} from "react";
import {fetchSuggestion} from "@/lib/fetchSuggestion";

export default function Header() {
    const [board, searchString, setSearchString] = useBoardStore((state) => [
        state.board,
        state.searchString,
        state.setSearchString,
    ]);

    const [loading, setLoading] = useState<boolean>(false);
    const [suggestion, setSuggestion] = useState<string>("");

    useEffect(() => {
        if (board.columns.size === 0) return;
        setLoading(true);
        const fetchSuggestionFunc = async () => {
            const suggestion = await fetchSuggestion(board);
            setSuggestion(suggestion);
            setLoading(false);
        };
        // fetchSuggestionFunc();
    }, [board]);

    return (
        <header>
            <div className="flex flex-col items-center p-5 md:flex-row rounded-b-2xl">
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-indigo-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50"></div>
                <Image
                    src="https://links.papareact.com/c2cdd5"
                    alt="Trello 2.0"
                    width={300}
                    height={100}
                    className="object-contain pb-10 w-44 md:w-56 md:pb-0 "
                />
                <div className="flex justify-end flex-1 w-full space-x-5 itmes-center">
                    {/* Search box */}
                    <form className="flex items-center flex-1 p-2 bg-white rounded-md shadow-md soace-x-5 md:flex-initial">
                        <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1 p-2 outline-none"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                        ></input>
                        <button type="submit" hidden>
                            Search
                        </button>
                    </form>
                    {/* Avatar */}
                    <Avatar name="Maciej Adamski" round color="#0055D1" size="50" />
                </div>
            </div>
            <div className="flex items-center justify-center px-5 py-2 md:py-5">
                <p className="flex items-center text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1] p-5">
                    <UserCircleIcon
                        className={`{nline-block h-10 w-10 text-[#0055D1] mr-1 ${loading && "animate-pulse"}`}
                    />
                    {suggestion && !loading ? suggestion : "GPT is summarising your tasks for the day ..."}
                </p>
            </div>
        </header>
    );
}

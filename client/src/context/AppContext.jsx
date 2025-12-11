import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets";
import { useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const fetchUser = async () => {
        // setUser(dummyUserData)
    }

    const fetchUsersChats = async () => {
        setChats(dummyChats)
        setSelectedChat(dummyChats[0])
    }
    useEffect(() => {
        if (user) {
            fetchUsersChats()
        } else {
            setChats([])
            setSelectedChat(null)
        }
    }, [user])

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('theme', theme)
    }, [theme])

    const value = {
        user,
        chats,
        selectedChat,
        theme,
        setSelectedChat,
        setTheme,
        setUser,
        setChats,
        fetchUsersChats,
        fetchUser,
        navigate,
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppContext, AppProvider }


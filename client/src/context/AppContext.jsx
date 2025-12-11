import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats } from "../assets/assets";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

const AppContext = createContext();

const AppProvider = ({ children }) => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/users/data', {
                headers: {
                    Authorization: token
                }
            })
            if (data.success) {
                setUser(data.user)
                toast.success('User fetched successfully')
            } else {
                setUser(null)
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const createNewChat = async () => {
        try {
            if (!user) return toast('Login to create a new chat')
            await axios.get('/api/chats/create', { headers: { Authorization: token } })
            toast.success('Chat created successfully')
            await fetchUsersChats()
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUsersChats = async () => {
        try {
            const { data } = await axios.get('/api/chats/get', {
                headers: { Authorization: token }
            });

            if (data.success) {
                setChats(data.chats);

                // If the user has no chats, create one
                if (data.chats.length === 0) {
                    await createNewChat();
                    return fetchUsersChats();
                } else {
                    setSelectedChat(data.chats[0]);
                }
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
        if (user) {
            fetchUsersChats()
        } else {
            setChats([])
            setSelectedChat(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    useEffect(() => {
        if (token) {
            fetchUser()
        } else {
            setUser(null)
            setIsLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

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
        createNewChat,
        isLoading,
        token, setToken,
        axios
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppContext, AppProvider }


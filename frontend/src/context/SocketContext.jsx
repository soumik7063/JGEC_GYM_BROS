import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { useUser } from '@clerk/clerk-react';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const { manualUser } = useAuth();
    const { user: clerkUser } = useUser();
    const userId = clerkUser?.id || manualUser?.userId;
    
    const [socket, setSocket] = useState(null);
    const [posts, setPosts] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';
    const SOCKET_URL = API_URL.replace('/api', '');

    // Fetch initial posts
    const fetchPosts = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/posts/feed`);
            const data = await res.json();
            if (data.success) {
                setPosts(data.posts);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        if (!userId) return;

        const newSocket = io(SOCKET_URL, {
            withCredentials: true,
        });

        newSocket.on('connect', () => {
            console.log('Connected to socket server');
            const userName = clerkUser?.firstName || manualUser?.name || "Gym Bro";
            newSocket.emit('join', { userId, userName });
        });


        newSocket.on('new_post', (post) => {
            setPosts((prev) => {
                const index = prev.findIndex(p => p._id === post._id);
                if (index !== -1) {
                    const newPosts = [...prev];
                    newPosts[index] = post;
                    return newPosts;
                }
                return [post, ...prev];
            });
        });


        newSocket.on('online_users', (users) => {
            setOnlineUsers(users);
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [userId, SOCKET_URL]);

    const toggleFistBump = async (postId) => {
        if (!userId) return;

        // Optimistic UI update
        const originalPosts = [...posts];
        setPosts((prev) => prev.map(post => {
            if (post._id === postId) {
                const index = post.fistBumps.indexOf(userId);
                const newFistBumps = index === -1 
                    ? [...post.fistBumps, userId] 
                    : post.fistBumps.filter(id => id !== userId);
                return { ...post, fistBumps: newFistBumps };
            }
            return post;
        }));

        try {
            const res = await fetch(`${API_URL}/posts/fistbump`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postId, userId })
            });
            const data = await res.json();
            if (!data.success) {
                setPosts(originalPosts); // Rollback on error
            }
        } catch (error) {
            console.error("Error toggling fist bump:", error);
            setPosts(originalPosts); // Rollback on error
        }
    };

    return (
        <SocketContext.Provider value={{ socket, posts, onlineUsers, loading, toggleFistBump }}>
            {children}
        </SocketContext.Provider>
    );
};

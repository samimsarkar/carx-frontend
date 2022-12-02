import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`https://carx-delta.vercel.app/user/${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.role === "Admin") {
                        setIsAdmin(true)
                        setIsLoading(false)
                    }
                })
        }
    }, [email])
    return [isAdmin, isLoading];
}

export default useAdmin;
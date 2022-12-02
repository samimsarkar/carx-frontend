import { useEffect, useState } from "react"

const useSeller = email => {
    const [isSeller, setIsSeller] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`https://carx-delta.vercel.app/user/${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.role === "seller") {
                        setIsSeller(true)
                        setIsLoading(false)
                    }
                })
        }
    }, [email])
    return [isSeller, isLoading];
}

export default useSeller;
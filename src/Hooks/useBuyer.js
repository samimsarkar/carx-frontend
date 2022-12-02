import { useEffect, useState } from "react"

const useBuyer = email => {
    const [isBuyer, setIsBuyer] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://carx-delta.vercel.app/user/${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.role === 'buyer') {
                        setIsBuyer(true)
                        setIsLoading(false)
                    }
                })
        }
    }, [email])
    return [isBuyer, isLoading];
}

export default useBuyer;
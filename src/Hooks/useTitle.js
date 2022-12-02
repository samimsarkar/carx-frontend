import { useEffect } from 'react';

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Feel the car, drive it, and show it.`;
    }, [title])
};

export default useTitle;
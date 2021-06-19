import { useRouter } from "next/router";
import React, { useEffect } from "react";

const page: React.FC = () => {
    const { replace } = useRouter()
    useEffect(() => {
        replace('/auth/login')
    }, [])
    return null
}

export default page;
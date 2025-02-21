import { useState, useEffect } from "react";

export default function Home() {
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        fetch("/api/trade")
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>{message}</h1>
            <p>Start trading smarter with Easy Trade 🚀</p>
        </div>
    );
}
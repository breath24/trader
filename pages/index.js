import { useState, useEffect } from "react";
import MarkdownNavigator from "../components/MarkdownNavigator";
import SectionContent from "../components/SectionContent";
import ErrorBoundary from "../components/ErrorBoundary";

export default function App() {
    return (
        <ErrorBoundary>
            <Home />
        </ErrorBoundary>
    );
}

function Home() {
    const [showMarkdownNavigator, setShowMarkdownNavigator] = useState(false);
    const [markdownContent, setMarkdownContent] = useState("");

    const handleBeginnerClick = async() => {
        try {
            const response = await fetch("/trading-basics.md"); // Fetch the Markdown file
            const text = await response.text();
            setMarkdownContent(text);
            setShowMarkdownNavigator(true);
        } catch (error) {
            console.error("Error loading Markdown file:", error);
        }
    };

    const handleStocksClick = async () => {
        try {
            const response = await fetch("/stocks.md"); // Fetch the Markdown file
            const text = await response.text();
            setMarkdownContent(text);
            setShowMarkdownNavigator(true);
        } catch (error) {
            console.error("Error loading Markdown file:", error);
        }
    };

    const handleBackClick = () => {
        setShowMarkdownNavigator(false);
    };

/*     if (showMarkdownNavigator) {
        return <MarkdownNavigator markdownText={markdownContent} />;
    } */

    const Card = ({ title, description, onClick }) => (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "10px",
                width: "200px",
                backgroundColor: "white",
            }}
        >
            <h3>{title}</h3>
            <p>{description}</p>
            <button
                onClick={onClick}
                style={{
                    padding: "10px 20px",
                    marginTop: "20px",
                    cursor: "pointer",
                }}
            >
                Start Learning
            </button>
        </div>
    );

    const Options = <div
        style={{
            backgroundColor: "white",
            borderRadius: "0",
            padding: "30px",
            maxWidth: "1000px",
            margin: "0 auto",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
    >
        <div style={{ marginTop: "10px" }}>
            <h1> Upward Journey to Trading 🚀</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    marginTop: "20px",
                    flexWrap: "wrap",
                }}
            >
                <Card
                    title="Basics"
                    description="Learn the basics of trading and get started on your journey."
                    onClick={handleBeginnerClick} />
                <Card
                    title="Stocks"
                    description="Learn how to trade stocks."
                    onClick={handleStocksClick} />
                <Card
                    title="Strategies"
                    description="Master trading with expert-level techniques and insights."
                    onClick={() => { } } />
            </div>
        </div>
    </div>;
    const PageContainer = ({ children }) => (
        <div
            style={{
                textAlign: "center",
                fontFamily: "Arial, sans-serif",
                minHeight: "100vh",
                padding: "0 20px",
                background: "linear-gradient(to bottom, #f0f2f5, #e2e8f0)",
            }}
        >
            {children}
        </div>
    );

    const HeaderImage = () => (
        <div
            style={{
                width: "100%",
                height: "200px",
                backgroundImage: "url('/trading-pic.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                marginBottom: "10px",
                //borderRadius: "15px",
                //boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
        />
    );

    const BackButton = () => (
        <button
            onClick={handleBackClick}
            style={{
                padding: "10px 20px",
                marginTop: "10px",
                marginBottom: "10px",
                cursor: "pointer",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                transition: "background-color 0.3s ease",
                "&:hover": {
                    backgroundColor: "#367c39",
                },
            }}
        >
            Back to Options
        </button>
    );

    return (
        <PageContainer>
            <HeaderImage />
            {showMarkdownNavigator === false ? Options : <MarkdownNavigator markdownText={markdownContent} handleBackClick={handleBackClick} />}
        </PageContainer>
    );
}
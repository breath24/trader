import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Import the plugin for GitHub-flavored Markdown
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import Font Awesome
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons"; // Import the speaker icon

const MarkdownNavigator = ({ markdownText }) => {
    const [currentSection, setCurrentSection] = useState(0);

    // Split the markdown text into sections based on headings (e.g., ## or ###)
    const sections = markdownText.split(/^##\s+/gm).filter((section) => section.trim() !== "");

    const handleNext = () => {
        // Stop any ongoing speech synthesis
        window.speechSynthesis.cancel();

        // Move to the next section
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    };

    const handlePrevious = () => {
        // Stop any ongoing speech synthesis
        window.speechSynthesis.cancel();

        // Move to the previous section
        setCurrentSection((prev) => Math.max(prev - 1, 0));
    };

    const handleReadText = () => {
        const textToRead = sections[currentSection];

        // Remove Markdown formatting (e.g., #, **, etc.)
        const plainText = textToRead.replace(/[#_*~`>[\]]/g, "").replace(/\*\*(.*?)\*\*/g, "$1");

        const utterance = new SpeechSynthesisUtterance(plainText);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div
            style={{
                textAlign: "left",
                fontFamily: "Arial, sans-serif",
                height: "100%", // Dynamically adjust height based on content
                padding: "20px",
                backgroundColor: "#f9f9f9",
            }}
        >
            <div
                style={{
                    position: "relative", // Make the parent container a positioning context
                    backgroundColor: "white",
                    borderRadius: "15px",
                    padding: "30px",
                    maxWidth: "800px",
                    margin: "0 auto",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
            >
                {/* Speaker Icon Button */}
                <button
                    onClick={handleReadText}
                    style={{
                        position: "absolute", // Position the button absolutely
                        top: "10px", // Distance from the top of the container
                        right: "10px", // Distance from the right of the container
                        padding: "10px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        fontWeight: "bold",
                        cursor: "pointer",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <FontAwesomeIcon icon={faVolumeUp} size="lg" />
                </button>

                {/* Markdown Content */}
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ node, children }) => (
                            <h1
                                style={{
                                    marginBottom: "20px",
                                    fontSize: "2em",
                                    fontWeight: "bold",
                                }}
                            >
                                {children}
                            </h1>
                        ),
                        h2: ({ node, children }) => (
                            <h2
                                style={{
                                    marginBottom: "15px",
                                    fontSize: "1.5em",
                                    fontWeight: "bold",
                                }}
                            >
                                {children}
                            </h2>
                        ),
                        h3: ({ node, children }) => (
                            <h3
                                style={{
                                    marginBottom: "10px",
                                    fontSize: "1.2em",
                                    fontWeight: "bold",
                                }}
                            >
                                {children}
                            </h3>
                        ),
                        p: ({ node, children }) => (
                            <p
                                style={{
                                    marginBottom: "1em",
                                    whiteSpace: "pre-wrap",
                                }}
                            >
                                {children}
                            </p>
                        ),
                        ul: ({ node, children }) => (
                            <ul
                                style={{
                                    marginBottom: "20px",
                                    paddingLeft: "20px",
                                }}
                            >
                                {children}
                            </ul>
                        ),
                        ol: ({ node, children }) => (
                            <ol
                                style={{
                                    marginBottom: "20px",
                                    paddingLeft: "20px",
                                }}
                            >
                                {children}
                            </ol>
                        ),
                        li: ({ node, children }) => (
                            <li
                                style={{
                                    marginBottom: "5px",
                                }}
                            >
                                {children}
                            </li>
                        ),
                    }}
                >
                    {`## ${sections[currentSection]}`}
                </ReactMarkdown>
                <div
                    style={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <button
                        onClick={handlePrevious}
                        disabled={currentSection === 0}
                        style={{
                            padding: "10px 20px",
                            cursor: currentSection === 0 ? "not-allowed" : "pointer",
                            backgroundColor: currentSection === 0 ? "#ccc" : "#007BFF",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            fontWeight: "bold",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentSection === sections.length - 1}
                        style={{
                            padding: "10px 20px",
                            cursor: currentSection === sections.length - 1 ? "not-allowed" : "pointer",
                            backgroundColor: currentSection === sections.length - 1 ? "#ccc" : "#007BFF",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            fontWeight: "bold",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarkdownNavigator;
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Import the plugin for GitHub-flavored Markdown

const MarkdownNavigator = ({ markdownText }) => {
    const [currentSection, setCurrentSection] = useState(0);

    // Split the markdown text into sections based on headings (e.g., ## or ###)
    const sections = markdownText.split(/^##\s+/gm).filter((section) => section.trim() !== "");

    const handleNext = () => {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    };

    const handlePrevious = () => {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div
            style={{
                textAlign: "left",
                fontFamily: "Arial, sans-serif",
                minHeight: "100vh",
                padding: "20px",
                backgroundColor: "#f9f9f9",
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    borderRadius: "15px",
                    padding: "30px",
                    maxWidth: "800px",
                    margin: "0 auto",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
            >
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ node, children }) => (
                            <h1
                                style={{
                                    marginBottom: "20px", // Add space after h1
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
                                    marginBottom: "15px", // Add space after h2
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
                                    marginBottom: "10px", // Add space after h3
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
                                    whiteSpace: "pre-wrap", // Preserve spaces and line breaks
                                }}
                            >
                                {children}
                            </p>
                        ),
                        ul: ({ node, children }) => (
                            <ul
                                style={{
                                    marginBottom: "20px", // Add space after the list
                                    paddingLeft: "20px", // Add indentation for unordered lists
                                }}
                            >
                                {children}
                            </ul>
                        ),
                        ol: ({ node, children }) => (
                            <ol
                                style={{
                                    marginBottom: "20px", // Add space after the list
                                    paddingLeft: "20px", // Add indentation for ordered lists
                                }}
                            >
                                {children}
                            </ol>
                        ),
                        li: ({ node, children }) => (
                            <li
                                style={{
                                    marginBottom: "5px", // Add space between list items
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
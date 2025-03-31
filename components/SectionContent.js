import React from "react";

const SectionContent = ({ title, list }) => {
    if (!title || !list) {
        throw new Error("SectionContent requires both a title and a list.");
    }

    return (
        <div style={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            marginBottom: '20px'
        }}>
            <h3 style={{
                color: '#333',
                borderBottom: '1px solid #eee',
                paddingBottom: '10px',
                marginBottom: '15px'
            }}>
                {title}
            </h3>
            <ul style={{
                listStyleType: 'disc',
                paddingLeft: '25px',
                color: '#555',
                lineHeight: '1.6'
            }}>
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default SectionContent;
import React from 'react';

const Loading = (props) => {
    const { message } = props;
    return (
        <div>
            <p className="loading-message"><i className="fas fa-spinner"></i> {message}</p>
        </div>
    );
}

export default Loading;
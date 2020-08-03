// Auhtor: Mansoor Ghazi

import React from 'react';

const Loading = (props) => {
    const { message } = props;
    return (
        <div>
            <p className="loading-message"><i className="fas fa-spinner  fa-spin"/> {message}</p>
        </div>
    );
}

export default Loading;

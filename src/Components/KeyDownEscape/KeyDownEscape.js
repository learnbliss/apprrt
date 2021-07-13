import React, {useEffect} from 'react';

const KeyDownEscape = ({doIt}) => {
    const escape = (e) => {
        if (e.key === 'Escape') doIt()
    };
    useEffect(() => {
        document.addEventListener('keydown', escape, false);
        return () => {
            document.removeEventListener('keydown', escape, false);
        };
    }, []); //eslint-disable-line
    return <div/>
};

export default KeyDownEscape;

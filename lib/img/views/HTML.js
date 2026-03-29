import fileUrl from '../../assets/css/input.scss.js';
import fileUrl$3 from '../../assets/font/HYWH-65W.ttf.js';
import fileUrl$2 from '../../assets/font/NZBZ.ttf.js';
import fileUrl$1 from '../../assets/font/tttgbnumber.ttf.js';
import classNames from 'classnames';
import React from 'react';

const HTML = (props) => {
    const { children, className, ...reSet } = props;
    return (React.createElement("html", { className: 'p-0 m-0' },
        React.createElement("head", null,
            React.createElement("link", { type: 'text/css', rel: 'stylesheet', href: fileUrl }),
            React.createElement("meta", { httpEquiv: 'content-type', content: 'text/html;charset=utf-8' }),
            React.createElement("style", { dangerouslySetInnerHTML: {
                    __html: `
              @font-face {
                font-family: 'tttgbnumber';
                src: url('${fileUrl$1}'); 
                font-weight: normal; 
                font-style: normal; 
              }
              @font-face {
                font-family: 'NZBZ';
                src: url('${fileUrl$2}');
                font-weight: normal;
                font-style: normal;
              }
              @font-face {
                font-family: 'HYWH';
                src: url('${fileUrl$3}');
                font-weight: normal;
                font-style: normal;
              }
              body { 
                font-family: 'HYWH', 'tttgbnumber', 
                'PingFang SC', system-ui, sans-serif; 
              }
            `
                } })),
        React.createElement("body", { className: classNames('p-0 m-0 w-full text-center', className), ...reSet }, children)));
};

export { HTML as default };

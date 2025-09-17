const xss = require('xss')
options = {
    whiteList: {
        p: [],
        span: ['class', 'contenteditable', 'data-mention-id', 'style'],
        a: ["href", "title", "target"],
        i: [],
        em: [],
        b: [],
        strong: [],
        ul: [],
        ol: [],
        li: [],
        br: [],
        img: ['src', 'alt'],
        table: [],
        colgroup: [],
        col: [],
        tbody: [],
        tr: [],
        td: ['style'],
        blockquote: []
    },
    onTagAttr: (tag, name, value, isWhiteAttr) => {
        // Kiểm tra thẻ span và thuộc tính contenteditable
        if (tag === 'span' && name === 'contenteditable') {
            return `contenteditable="${value}"`; // Giữ nguyên contenteditable
        }
        return `${name}="${value}"`;  // Trả lại các thuộc tính khác
    }
}; // Custom rules
const xssFilter = new xss.FilterXSS(options);

const xssFilterHelper = {
    process: (html, opts = null) => {
        return xssFilter.process(html);
    }
}

module.exports = xssFilter;

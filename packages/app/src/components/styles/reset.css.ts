import { css } from "lit";

const styles = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        line-height: 1.5;
    }

    img, picture, video, canvas, svg {
        display: block;
        max-width: 100%;
        height: auto;
    }

    html {
        -webkit-text-size-adjust: 100%;
        font-size: 100%;
        scroll-behavior: smooth;
    }

    input, button, textarea, select {
        font: inherit;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    button {
        cursor: pointer;
    }

    :focus {
        outline: 2px solid Highlight;
        outline-offset: 2px;
    }
`;

export default { styles };
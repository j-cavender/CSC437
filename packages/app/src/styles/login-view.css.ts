import {css} from "lit";

const styles = css`

    .signup-link {
        text-align: center;
        margin-top: var(--space-xl);
        color: var(--color-text-page);
    }

    .signup-link a {
        color: var(--color-background-header);
        text-decoration: none;
        font-weight: 600;
    }

    .signup-link a:hover {
        text-decoration: underline;
    }
`;

export default {styles};
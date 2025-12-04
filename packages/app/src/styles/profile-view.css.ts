import {css} from "lit";

const styles = css`
    h2 {
        text-align: left;
    }

    .profile-card {
        max-width: 600px;
    }

    .profile-section {
        margin-bottom: var(--space-lg);
    }

    .profile-section span {
        display: block;
        margin-bottom: var(--space-sm);
        font-weight: 600;
        color: var(--color-text-page);
    }

    .profile-value {
        padding: var(--space-md);
        background: var(--color-background-page);
        border-radius: var(--radius-md);
        color: var(--color-text-page);
    }
`;

export default {styles};
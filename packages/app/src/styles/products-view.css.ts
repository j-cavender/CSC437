import {css} from "lit";

const styles = css`
    .category-pills {
        display: flex;
        gap: var(--space-sm);
        flex-wrap: wrap;
    }

    .pill {
        padding: var(--space-sm) var(--space-lg);
        background: var(--color-background-card);
        border: 2px solid var(--color-border);
        border-radius: var(--radius-full);
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--color-text-page);
        cursor: pointer;
        transition: all 0.2s;
        text-transform: capitalize;
    }

    .pill:hover {
        border-color: var(--color-background-header);
    }

    .pill.active {
        background: var(--color-background-header);
        color: var(--color-text-header);
        border-color: var(--color-background-header);
    }

    .products-container {
        margin-top: var(--space-xl);
    }

    .empty-state {
        text-align: center;
        padding: var(--space-3xl);
        color: var(--color-text-page);
        opacity: 0.6;
    }

    .empty-state p {
        margin: 0;
        font-size: 1.1rem;
    }

    @media (max-width: 480px) {
        .category-pills {
            gap: var(--space-xs);
        }

        .pill {
            font-size: 0.85rem;
            padding: var(--space-xs) var(--space-md);
        }
    }
`;

export default {styles};
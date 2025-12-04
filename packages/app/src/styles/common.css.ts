import {css} from "lit";

const styles = css`
    :host {
        display: block;
        width: 100%;
    }

    .page-container {
        min-height: 80vh;
        padding: var(--space-2xl) max(var(--space-xl), 5vw);
        background: var(--color-background-page);
    }

    .content-wrapper {
        max-width: 1200px;
        margin: 0 auto;
    }

    .content-wrapper-narrow {
        max-width: 600px;
        margin: 0 auto;
    }

    .view-container {
        min-height: 80vh;
        padding: var(--space-2xl) max(var(--space-xl), 5vw);
        background: var(--color-background-page);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .card {
        padding: var(--space-2xl);
        width: 100%;
        background: var(--color-background-card);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
    }

    h1 {
        color: var(--color-text-page);
        font-family: var(--font-family-serif);
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 var(--space-xl) 0;
        line-height: 1.2;
    }

    h2 {
        color: var(--color-text-page);
        font-family: var(--font-family-serif);
        font-size: 2rem;
        font-weight: 600;
        margin: 0 0 var(--space-lg) 0;
        line-height: 1.3;
    }

    h3 {
        color: var(--color-text-page);
        font-family: var(--font-family-serif);
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0 0 var(--space-md) 0;
    }

    label {
        display: block;
        margin-bottom: var(--space-lg);
    }

    label span {
        display: block;
        margin-bottom: var(--space-sm);
        font-weight: 600;
        color: var(--color-text-page);
    }

    input[type="text"],
    input[type="password"],
    input[type="email"],
    input[type="number"] {
        width: 100%;
        padding: var(--space-md);
        border: 2px solid var(--color-border);
        border-radius: var(--radius-md);
        font-size: 1rem;
        box-sizing: border-box;
        background: var(--color-background-card);
        color: var(--color-text-page);
        transition: border-color var(--transition-base);
    }

    input:focus {
        outline: none;
        border-color: var(--color-background-header);
    }

    .btn-primary,
    button[type="submit"] {
        width: 100%;
        padding: var(--space-md) var(--space-xl);
        background-color: var(--color-background-header);
        color: var(--color-text-header);
        border: none;
        border-radius: var(--radius-md);
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all var(--transition-base);
    }

    .btn-primary:hover:not(:disabled),
    button[type="submit"]:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }

    .btn-primary:disabled,
    button[type="submit"]:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .btn-secondary {
        padding: var(--space-md) var(--space-lg);
        background: transparent;
        color: var(--color-text-page);
        border: 2px solid var(--color-text-page);
        border-radius: var(--radius-md);
        font-size: 1rem;
        font-weight: 600;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        transition: all var(--transition-base);
    }

    .btn-secondary:hover {
        background: var(--color-text-page);
        color: var(--color-background-page);
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        .page-container,
        .view-container {
            padding: var(--space-xl) var(--space-md);
        }

        .card {
            padding: var(--space-xl);
        }

        h1 {
            font-size: 2rem;
        }

        h2 {
            font-size: 1.75rem;
        }

        h3 {
            font-size: 1.25rem;
        }
    }

    @media (max-width: 480px) {
        .page-container,
        .view-container {
            padding: var(--space-lg) var(--space-sm);
        }

        .card {
            padding: var(--space-lg);
        }

        h1 {
            font-size: 1.75rem;
        }

        h2 {
            font-size: 1.5rem;
        }

        h3 {
            font-size: 1.1rem;
        }
    }
`;

export default {styles};

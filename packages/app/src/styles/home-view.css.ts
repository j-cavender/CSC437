import {css} from "lit";

const styles = css`
    .hero-container {
        min-height: 80vh;
        padding: var(--space-2xl) max(var(--space-xl), 5vw);
        background: var(--color-background-page);
    }

    .content-wrapper {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-3xl);
        align-items: center;
        position: relative;
    }

    .text-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-lg);
    }

    .label {
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: var(--color-accent);
        font-family: var(--font-family-serif);
    }

    h1 {
        font-size: 3rem;
        margin: 0;
    }

    .highlight {
        color: var(--color-accent);
        font-style: italic;
    }

    .description {
        font-size: 1.125rem;
        line-height: 1.6;
        color: var(--color-text-page);
        opacity: 0.8;
        font-family: var(--font-family-sans-serif);
    }


    .cta-container {
        display: flex;
        gap: var(--space-md);
        margin-top: var(--space-md);
    }

    .btn {
        padding: var(--space-md) var(--space-xl);
        border-radius: var(--radius-md);
        font-weight: 600;
        font-size: 1rem;
        transition: all var(--transition-base);
        cursor: pointer;
        font-family: var(--font-family-serif);
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 2px solid transparent;
    }

    .btn-primary {
        background: var(--color-background-header);
        color: var(--color-text-header);
        border-color: var(--color-background-header);
    }

    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }

    .btn-secondary {
        background: transparent;
        color: var(--color-accent);
        border-color: var(--color-accent);
    }

    .btn-secondary:hover {
        background: var(--color-accent);
        color: var(--color-background-page);
        transform: translateY(-2px);
    }

    .visual-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pottery-display {
        position: relative;
        width: 100%;
        height: 400px;
    }

    .pottery-card {
        position: absolute;
        border-radius: var(--radius-lg);
        background: var(--color-background-card);
        box-shadow: var(--shadow-lg);
        transition: transform var(--transition-base);
    }


    .pottery-card:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-xl);
    }


    .card-1 {
        width: 240px;
        height: 280px;
        top: 20px;
        left: 0;
        z-index: 2;
    }

    .card-2 {
        width: 220px;
        height: 260px;
        bottom: 20px;
        right: 20px;
        z-index: 1;
    }

    .card-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--radius-lg);
        display: block;
    }

    .stats-bar {
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin: var(--space-3xl) 0 0;
        padding: var(--space-xl);
        background: var(--color-background-card);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
    }


    .stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-sm);
    }

    .stat-number {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--color-accent);
        font-family: var(--font-family-serif);
    }

    .stat-label {
        font-size: 0.875rem;
        color: var(--color-text-page);
        text-transform: uppercase;
        letter-spacing: 1px;
        font-family: var(--font-family-serif);
        opacity: 0.7;
    }


    @media (max-width: 1024px) {
        h1 {
            font-size: 2.5rem;
        }

        .description {
            font-size: 1rem;
        }

        .pottery-display {
            height: 380px;
        }
    }

    @media (max-width: 768px) {
        .hero-container {
            min-height: auto;
        }

        .content-wrapper {
            grid-template-columns: 1fr;
            gap: var(--space-2xl);
        }

        h1 {
            font-size: 2.25rem;
        }

        .description {
            font-size: 1rem;
        }

        .pottery-display {
            height: 350px;
        }

        .card-1 {
            width: 200px;
            height: 240px;
        }

        .card-2 {
            width: 180px;
            height: 220px;
        }

        .stats-bar {
            flex-direction: column;
            gap: var(--space-lg);
        }

        .cta-container {
            flex-direction: column;
        }

        .btn {
            width: 100%;
        }
    }

    @media (max-width: 480px) {
        h1 {
            font-size: 1.75rem;
        }

        .label {
            font-size: 0.75rem;
        }

        .description {
            font-size: 0.9rem;
        }

        .pottery-display {
            height: 280px;
        }

        .card-1 {
            width: 160px;
            height: 200px;
            top: 10px;
        }

        .card-2 {
            width: 140px;
            height: 180px;
            bottom: 10px;
            right: 10px;
        }

        .stat-number {
            font-size: 2rem;
        }

        .stat-label {
            font-size: 0.75rem;
        }

        .btn {
            padding: var(--space-sm) var(--space-md);
        }
    }
`;

export default {styles};

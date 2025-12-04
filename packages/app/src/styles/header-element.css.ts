import {css} from "lit";

const styles = css`
    :host {
        outline: none !important;
    }

    :host(:focus),
    :host(:focus-visible) {
        outline: none !important;
    }

    header {
        background-color: var(--color-background-header);
        color: var(--color-text-header);
        font-family: var(--font-family-sans-serif);
        box-shadow: var(--shadow-md);
        outline: none !important;
    }

    header:focus,
    header:focus-visible,
    header:active {
        outline: none !important;
        box-shadow: var(--shadow-md);
    }

    .header-inner {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-lg) max(var(--space-xl), 5vw);
        gap: var(--space-xl);
    }

    h1 {
        font-family: var(--font-family-serif);
        font-size: 1.75rem;
        font-weight: 700;
        margin: 0;
        letter-spacing: 0.5px;
        white-space: nowrap;
    }

    .main-nav {
        display: flex;
        align-items: center;
        gap: var(--space-lg);
        flex: 1;
        justify-content: center;
    }

    .nav-link {
        color: var(--color-text-header);
        text-decoration: none;
        font-size: 1rem;
        font-weight: 500;
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius-md);
        transition: all var(--transition-base);
        position: relative;
        outline: none !important;
    }

    .nav-link:focus,
    .nav-link:focus-visible,
    .nav-link:active {
        outline: none !important;
        box-shadow: none !important;
    }

    .nav-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background-color: var(--color-text-header);
        transition: width var(--transition-base);
    }

    .nav-link:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .nav-link:hover::after {
        width: 80%;
    }

    .header-controls {
        display: flex;
        align-items: center;
        gap: var(--space-lg);
    }

    .user-control {
        display: flex;
        align-items: center;
        gap: var(--space-md);
    }

    .user-greeting {
        color: var(--color-text-header);
        font-size: 0.95rem;
        opacity: 0.9;
    }

    .auth-button {
        background-color: transparent;
        border: 2px solid var(--color-text-header);
        color: var(--color-text-header);
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius-md);
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 600;
        transition: all var(--transition-base);
        outline: none !important;
    }

    .auth-button:focus,
    .auth-button:focus-visible,
    .auth-button:active {
        outline: none !important;
        box-shadow: none !important;
    }

    .auth-button:hover {
        background-color: var(--color-text-header);
        color: var(--color-background-header);
        transform: translateY(-1px);
    }

    button.auth-button {
        cursor: pointer;
        font-family: var(--font-family-sans-serif);
    }

    @media (max-width: 768px) {
        .header-inner {
            padding: var(--space-md);
            flex-wrap: wrap;
        }

        h1 {
            font-size: 1.5rem;
        }

        .main-nav {
            order: 3;
            width: 100%;
            justify-content: center;
            gap: var(--space-md);
            padding-top: var(--space-md);
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .nav-link {
            font-size: 0.9rem;
            padding: var(--space-xs) var(--space-sm);
        }

        .header-controls {
            flex-direction: column;
            align-items: flex-end;
            gap: var(--space-sm);
        }

        .user-greeting {
            display: none;
        }
    }

    @media (max-width: 480px) {
        .header-inner {
            padding: var(--space-sm);
        }

        h1 {
            font-size: 1.25rem;
        }

        .main-nav {
            gap: var(--space-sm);
        }

        .nav-link {
            font-size: 0.85rem;
        }

        .auth-button {
            padding: var(--space-xs) var(--space-sm);
            font-size: 0.85rem;
        }
    }
`;

export default {styles};
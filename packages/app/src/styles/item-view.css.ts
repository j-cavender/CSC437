import {css} from "lit";

const styles = css`
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 50vh;
        font-size: 1.2rem;
        color: var(--color-text-page);
    }

    .item-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-3xl);
        background: var(--color-background-card);
        padding: var(--space-2xl);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
    }

    .item-image {
        width: 100%;
        border-radius: var(--radius-md);
        overflow: hidden;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }

    .item-image img {
        display: block;
        width: 100%;
        height: auto;
        border-radius: var(--radius-md);
    }

    .item-details {
        display: flex;
        flex-direction: column;
        gap: var(--space-lg);
    }

    .item-name {
        font-family: var(--font-family-serif);
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-text-page);
        margin: 0;
        line-height: 1.2;
    }

    .item-price {
        font-size: 2rem;
        font-weight: 600;
        color: var(--color-accent);
        margin: var(--space-md) 0;
    }

    .item-description h2 {
        text-align: left;
    }

    .item-description p {
        font-size: 1.1rem;
        line-height: 1.6;
        color: var(--color-text-page);
        opacity: 0.9;
    }

    .item-actions {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        margin-top: var(--space-lg);
    }

    .btn-add-cart,
    .btn-back {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-sm);
        padding: var(--space-md) var(--space-xl);
        font-size: 1.1rem;
        font-weight: 600;
        border: none;
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all var(--transition-base);
        text-decoration: none;
        font-family: var(--font-family-sans-serif);
    }

    .btn-add-cart {
        background: var(--color-background-header);
        color: var(--color-text-header);
    }

    .btn-add-cart:not(:disabled):hover {
        background: var(--color-link-visited);
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }

    .btn-add-cart:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .btn-back {
        background: transparent;
        color: var(--color-text-page);
        border: 2px solid var(--color-text-page);
    }

    .btn-back:hover {
        background: var(--color-text-page);
        color: var(--color-background-page);
        transform: translateY(-2px);
    }

    .cart-icon {
        stroke-width: 2;
    }

    .item-info {
        margin-top: var(--space-xl);
        padding-top: var(--space-xl);
        border-top: 1px solid var(--color-border);
    }


    .item-info ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .item-info li {
        padding: var(--space-sm) 0;
        color: var(--color-text-page);
        font-size: 1rem;
    }

    .item-info li strong {
        display: inline-block;
        min-width: 100px;
        color: var(--color-text-page);
        opacity: 0.7;
    }

    @media (max-width: 968px) {
        .item-content {
            grid-template-columns: 1fr;
            gap: var(--space-xl);
        }

        .item-price {
            font-size: 1.75rem;
        }
    }

    @media (max-width: 480px) {
        .item-content {
            padding: var(--space-lg);
        }

        .item-price {
            font-size: 1.5rem;
        }

        .btn-add-cart,
        .btn-back {
            font-size: 1rem;
            padding: var(--space-sm) var(--space-lg);
        }
    }


`;

export default {styles};

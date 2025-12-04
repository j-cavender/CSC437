import {css} from "lit";

const styles = css`
    h1 {
        text-align: left;
    }

    .empty-cart {
        text-align: center;
        padding: var(--space-3xl);
        color: var(--color-text-page);
    }

    .empty-cart p {
        font-size: 1.25rem;
        margin-bottom: var(--space-xl);
    }

    .cart-items {
        margin-bottom: var(--space-2xl);
    }

    .cart-item {
        display: grid;
        grid-template-columns: 120px 1fr auto auto auto;
        gap: var(--space-lg);
        align-items: center;
        padding: var(--space-lg);
        margin-bottom: var(--space-lg);
        background: var(--color-background-card);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
    }


    .item-image {
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: var(--radius-md);
    }

    .item-details h3 {
        color: var(--color-text-page);
        font-size: 1.25rem;
        margin: 0 0 var(--space-sm) 0;
    }

    .item-price {
        color: var(--color-text-page);
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0;
    }

    .item-quantity {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
    }

    .item-quantity label {
        color: var(--color-text-page);
        font-size: 0.9rem;
        font-weight: 600;
    }

    .item-quantity input {
        width: 80px;
        padding: var(--space-sm);
        border: 2px solid var(--color-border);
        border-radius: var(--radius-md);
        font-size: 1rem;
        text-align: center;
        background: var(--color-background-card);
        color: var(--color-text-page);
    }


    .item-subtotal {
        color: var(--color-text-page);
        font-size: 1.25rem;
        font-weight: 700;
        min-width: 100px;
        text-align: right;
    }

    .btn-remove {
        padding: var(--space-sm) var(--space-md);
        background: #dc3545;
        color: white;
        border: none;
        border-radius: var(--radius-md);
        font-weight: 600;
        cursor: pointer;
        transition: all var(--transition-base);
    }

    .btn-remove:hover {
        background: #c82333;
        transform: translateY(-2px);
    }

    .cart-summary {
        max-width: 500px;
        margin-left: auto;
        padding: var(--space-xl);
        background: var(--color-background-card);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
    }


    .summary-row {
        display: flex;
        justify-content: space-between;
        padding: var(--space-md) 0;
        color: var(--color-text-page);
        font-size: 1.1rem;
    }

    .summary-row.total {
        border-top: 2px solid var(--color-border);
        margin-top: var(--space-md);
        padding-top: var(--space-lg);
        font-size: 1.5rem;
        font-weight: 700;
    }


    .cart-actions {
        display: flex;
        gap: var(--space-md);
        margin-top: var(--space-xl);
    }

    .btn-continue,
    .btn-checkout {
        flex: 1;
        padding: var(--space-md) var(--space-lg);
        border-radius: var(--radius-md);
        font-size: 1rem;
        font-weight: 600;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        transition: all var(--transition-base);
    }

    .btn-continue {
        background: transparent;
        color: var(--color-text-page);
        border: 2px solid var(--color-text-page);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-continue:hover {
        background: var(--color-text-page);
        color: var(--color-background-page);
        transform: translateY(-2px);
    }

    .btn-checkout {
        background: var(--color-background-header);
        color: var(--color-text-header);
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-checkout:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
    }

    .btn-checkout:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        .cart-item {
            grid-template-columns: 1fr;
            gap: var(--space-md);
        }

        .item-image {
            width: 100%;
            max-width: 200px;
            margin: 0 auto;
        }

        .item-details,
        .item-quantity,
        .item-subtotal {
            text-align: center;
        }

        .item-quantity input {
            margin: 0 auto;
        }

        .btn-remove {
            width: 100%;
        }

        .cart-actions {
            flex-direction: column;
        }
    }
`;

export default {styles};

import {html, css, LitElement} from 'lit';
import {property} from "lit/decorators.js";
import {PotteryItem} from "server/models";
import reset from "../styles/reset.css";

export class PotteryItemElement extends LitElement {
    @property({type: Object})
    item?: PotteryItem;

    render() {
        if (!this.item) return html``;

        return html`
            <a href="/app/items/${this.item.itemId}" class="card">
                <div class="image-container">
                    <img
                            src="${this.item.imgSrc}"
                            alt="${this.item.alt}"
                            loading="lazy"
                    />
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="product-name">${this.item.name}</h3>
                        <span class="product-type">${this.item.type}</span>
                    </div>
                    <div class="card-footer">
                        <span class="price">$${this.item.price.toFixed(2)}</span>
                    </div>
                </div>
            </a>
        `;
    }

    static styles = [
        reset.styles,
        css`
            :host {
                display: block;
            }

            .card {
                display: block;
                text-decoration: none;
                background: var(--color-background-card);
                border-radius: var(--radius-lg);
                overflow: hidden;
                box-shadow: var(--shadow-sm);
                transition: all 0.3s ease;
                height: 100%;
            }

            .card:hover {
                box-shadow: var(--shadow-lg);
                transform: translateY(-4px);
            }

            .image-container {
                width: 100%;
                aspect-ratio: 1;
                background: var(--color-background-page);
                overflow: hidden;
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }

            .card:hover img {
                transform: scale(1.05);
            }

            .card-content {
                padding: var(--space-md);
            }

            .card-header {
                margin-bottom: var(--space-sm);
            }

            .product-name {
                font-size: 1.05rem;
                font-weight: 600;
                color: var(--color-text-page);
                margin: 0 0 var(--space-xs) 0;
                line-height: 1.3;
            }

            .product-type {
                font-size: 0.8rem;
                color: var(--color-text-muted);
                text-transform: capitalize;
            }

            .card-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: var(--space-sm);
                border-top: 1px solid var(--color-border);
            }

            .price {
                font-size: 1.15rem;
                font-weight: 700;
                color: var(--color-accent);
            }
        `
    ];
}

import {html, css, LitElement} from 'lit';
import {property} from "lit/decorators.js";
import {PotteryItem} from "server/models";
import reset from "../styles/reset.css";

export class PotteryListElement extends LitElement {
    @property({type: Array})
    products: PotteryItem[] = [];

    render() {
        return html`
            <div class="product-grid">
                ${this.products.map(item => html`
                    <pottery-item
                            .item=${item}
                    ></pottery-item>
                `)}
            </div>
        `;
    }

    static styles = [
        reset.styles,
        css`
            :host {
                display: block;
                width: 100%;
            }

            .product-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: var(--space-lg);
            }

            @media (max-width: 768px) {
                .product-grid {
                    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                    gap: var(--space-md);
                }
            }

            @media (max-width: 480px) {
                .product-grid {
                    grid-template-columns: 1fr;
                }
            }
        `
    ];
}
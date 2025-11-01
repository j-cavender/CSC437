import { html, css, LitElement } from 'lit';
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

export class PotteryItemElement extends LitElement {

    @property({ attribute: "img-src" })
    imgSrc?: string;

    @property({ attribute: "item-id" })
    itemId?: string;

    @property()
    alt?: string;

    @property()
    width?: string;

    override render() {
        return html`
            <dl>
                <dt><slot>Item Name</slot> #${this.itemId}</dt>
                <dd>
                    <img
                            src="${this.imgSrc}"
                            width="${this.width}"
                            alt="${this.alt}"
                    />
                </dd>
            </dl>
        `;
    }
    static styles = [
        reset.styles,
        css`
            dl {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
            }

            dt {
                font-size: 1.1rem;
            }

            dd {
                margin: 0;
            }

            img {
                display: block;
                width: 100%;
                height: auto;
            }
        `
    ];
}
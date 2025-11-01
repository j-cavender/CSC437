import { html, LitElement } from 'lit';
import { property, state } from "lit/decorators.js";

interface PotteryItem {
    itemId: string;
    name: string;
    imgSrc: string;
    alt: string;
    width: string;
}

export class PotteryListElement extends LitElement {
    @property()
    src?: string;

    @state()
    bowls: Array<PotteryItem> = [];

    @state()
    teaSets: Array<PotteryItem> = [];

    @state()
    trinkets: Array<PotteryItem> = [];

    createRenderRoot() {
        return this;
    }

    connectedCallback() {
        super.connectedCallback();
        this.style.display = 'contents';
        if (this.src) this.hydrate(this.src);
    }

    hydrate(url: string) {
        fetch(url)
            .then(res => res.json())
            .then((json: object) => {
                if (json) {
                    const products = json as {
                        bowls: Array<PotteryItem>,
                        teaSets: Array<PotteryItem>,
                        trinkets: Array<PotteryItem>
                    };
                    this.bowls = products.bowls;
                    this.teaSets = products.teaSets;
                    this.trinkets = products.trinkets;
                }
            });
    }

    render() {
        const { bowls, teaSets, trinkets } = this;

        function renderPotteryItem(item: PotteryItem) {
            return html`
                <pottery-item
                        item-id=${item.itemId}
                        img-src=${item.imgSrc}
                        alt=${item.alt}
                        width=${item.width}
                >
                    ${item.name}
                </pottery-item>
            `;
        }

        return html`
            <section class="product-title">
                <h2>
                    <svg class="icon">
                        <use href="/icons/pottery.svg#icon-plates"/>
                    </svg>
                    Bowls
                </h2>
            </section>
            <div class="product-list">
                ${bowls.map(renderPotteryItem)}
            </div>

            <section class="product-title">
                <h2>
                    <svg class="icon">
                        <use href="/icons/pottery.svg#icon-pottery3"/>
                    </svg>
                    Tea Set
                </h2>
            </section>
            <div class="product-list">
                ${teaSets.map(renderPotteryItem)}
            </div>

            <section class="product-title">
                <h2>
                    <svg class="icon">
                        <use href="/icons/pottery.svg#icon-candles"/>
                    </svg>
                    Trinkets
                </h2>
            </section>
            <div class="product-list">
                ${trinkets.map(renderPotteryItem)}
            </div>
        `;
    }
}
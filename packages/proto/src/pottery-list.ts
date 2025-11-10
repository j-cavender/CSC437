import { html, css, LitElement } from 'lit';
import { property, state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";
import reset from "./styles/reset.css.ts";

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

    _authObserver = new Observer<Auth.Model>(this, "pottery:auth");
    _user?: Auth.User;

    connectedCallback() {
        super.connectedCallback();

        this._authObserver.observe((auth: Auth.Model) => {
            this._user = auth.user;
        });

        if (this.src) this.hydrate(this.src);
    }

    get authorization() {
        return (
            this._user?.authenticated && {
                Authorization:
                    `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
            }
        );
    }

    hydrate(url: string) {
        fetch(url, { headers: this.authorization || {} })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
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
            })
            .catch((error) => {
                console.error('Error fetching pottery data:', error);
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

    static styles = [
        reset.styles,
        css`
            :host {
                display: grid;
                grid-column: 1 / -1;
                grid-template-columns: subgrid;
            }

            h2 {
                color: var(--color-text-page);
                font-family: var(--font-family-serif);
            }

            .product-title {
                grid-column: 1 / -1;
                display: flex;
                justify-content: center;
            }

            .product-list {
                grid-column: 1 / -1;
                display: grid;
                grid-template-columns: subgrid;
            }

            .product-list > * {
                grid-column: span 1;
                text-align: center;
            }

            svg.icon {
                display: inline;
                height: 2em;
                width: 2em;
                vertical-align: top;
                fill: currentColor;
            }

            a {
                color: var(--color-link);
            }

            a:visited {
                color: var(--color-link-visited);
            }

            a:hover {
                text-decoration: underline;
                text-underline-offset: 2px;
            }
        `
    ];
}
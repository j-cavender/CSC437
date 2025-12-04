import {html} from "lit";
import {property, state} from "lit/decorators.js";
import {View, Observer, Auth} from "@calpoly/mustang";
import {PotteryItem} from "server/models";
import {Msg} from "../messages";
import {Model} from "../model";
import tokens from "../styles/tokens.css.js";
import commonStyles from "../styles/common.css.js";
import itemStyles from "../styles/item-view.css.js";

export class ItemViewElement extends View<Model, Msg> {
    static styles = [tokens.styles, commonStyles.styles, itemStyles.styles];

    @property({attribute: "item-id"})
    itemId?: string;

    @state()
    get item(): PotteryItem | undefined {
        return this.model.item;
    }

    get imageUrl(): string {
        if (!this.item?.imgSrc) return '';
        const src = this.item.imgSrc;
        if (src.startsWith('../')) {
            return '/' + src.substring(3);
        }
        return src;
    }

    @state()
    userid?: string;

    _authObserver = new Observer<Auth.Model>(this, "pottery:auth");

    constructor() {
        super("pottery:model");
    }

    connectedCallback() {
        super.connectedCallback();

        this._authObserver.observe((auth: Auth.Model) => {
            const {user} = auth;
            if (user && user.authenticated) {
                this.userid = user.username;
            } else {
                this.userid = undefined;
            }
        });
    }

    attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
    ) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (
            name === "item-id" &&
            oldValue !== newValue &&
            newValue
        ) {
            this.dispatchMessage([
                "item/request",
                {itemId: newValue}
            ]);
        }
    }

    handleAddToCart() {
        if (this.userid && this.item) {
            this.dispatchMessage([
                "cart/add",
                {
                    userid: this.userid,
                    itemId: this.item.itemId,
                    name: this.item.name,
                    price: this.item.price,
                    imgSrc: this.item.imgSrc
                }
            ]);

            alert(`${this.item.name} added to cart!`);
        }
    }

    render() {
        const item = this.item;
        if (!item || !item.name || !item.price) {
            return html`
                <div class="loading">
                    <p>Loading product details...</p>
                </div>
            `;
        }

        return html`
            <div class="page-container">
                <div class="content-wrapper">
                    <div class="item-content">
                        <div class="item-image">
                            <img
                                    src="${this.imageUrl}"
                                    alt="${this.item.alt}"
                            />
                        </div>

                        <div class="item-details">
                            <h1 class="item-name">${this.item.name}</h1>

                            <div class="item-price">
                                    $${this.item.price.toFixed(2)}
                            </div>

                            <div class="item-description">
                                <h2>Description</h2>
                                <p>${this.item.description}</p>
                            </div>

                            <div class="item-actions">
                                <button
                                        class="btn-add-cart"
                                        ?disabled=${!this.userid}
                                        @click=${this.handleAddToCart}
                                >
                                    <svg class="cart-icon" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor">
                                        <circle cx="9" cy="21" r="1"></circle>
                                        <circle cx="20" cy="21" r="1"></circle>
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                    </svg>
                                    ${this.userid ? 'Add to Cart' : 'Login to Add to Cart'}
                                </button>

                                <a href="/app/products" class="btn-back">
                                    Back to Products
                                </a>
                            </div>

                            <div class="item-info">
                                <h3>Product Details</h3>
                                <ul>
                                    <li><strong>Item ID:</strong> ${this.item.itemId}</li>
                                    <li><strong>Type:</strong> Handcrafted Pottery</li>
                                    <li><strong>Material:</strong> Ceramic</li>
                                    <li><strong>Care:</strong> Dishwasher safe</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        `;
    }
}

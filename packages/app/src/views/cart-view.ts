import {html} from "lit";
import {state} from "lit/decorators.js";
import {View, Observer, Auth} from "@calpoly/mustang";
import {CartItem} from "server/models";
import {Msg} from "../messages";
import {Model} from "../model";
import tokens from "../styles/tokens.css.js";
import commonStyles from "../styles/common.css.js";
import cartStyles from "../styles/cart-view.css.js";

export class CartViewElement extends View<Model, Msg> {
    static styles = [tokens.styles, commonStyles.styles, cartStyles.styles];

    @state()
    userid?: string;

    @state()
    get cart(): CartItem[] | undefined {
        return this.model.cart;
    }

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
                this.dispatchMessage(["cart/request", {userid: user.username}]);
            } else {
                this.userid = undefined;
            }
        });
    }

    handleQuantityChange(itemId: string, event: Event) {
        const input = event.target as HTMLInputElement;
        const quantity = parseInt(input.value, 10);

        if (this.userid && quantity > 0) {
            this.dispatchMessage(["cart/updateQuantity", {userid: this.userid, itemId, quantity}]);
        }
    }

    handleRemoveItem(itemId: string) {
        if (this.userid) {
            this.dispatchMessage(["cart/remove", {userid: this.userid, itemId}]);
        }
    }

    calculateTotal(): number {
        if (!this.cart) return 0;
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    render() {
        const cart = this.cart;

        if (!this.userid) {
            return html`
                <div class="page-container">
                    <div class="content-wrapper">
                        <h1>Shopping Cart</h1>
                        <p>Please log in to view your cart.</p>
                    </div>
                </div>
            `;
        }

        if (!cart) {
            return html`
                <div class="page-container">
                    <div class="content-wrapper">
                        <h1>Shopping Cart</h1>
                        <p>Loading cart...</p>
                    </div>
                </div>
            `;
        }

        if (cart.length === 0) {
            return html`
                <div class="page-container">
                    <div class="content-wrapper">
                        <h1>Shopping Cart</h1>
                        <div class="empty-cart">
                            <p>Your cart is empty.</p>
                            <a href="/app/products" class="btn-continue">Continue Shopping</a>
                        </div>
                    </div>
                </div>
            `;
        }

        return html`
            <div class="page-container">
                <div class="content-wrapper">
                    <h1>Shopping Cart</h1>

                    <div class="cart-items">
                        ${cart.map((item) => html`
                            <div class="cart-item">
                                <img
                                        src="${item.imgSrc}"
                                        alt="${item.name}"
                                        class="item-image"
                                />

                                <div class="item-details">
                                    <h3>${item.name}</h3>
                                    <p class="item-price">$${item.price.toFixed(2)}</p>
                                </div>

                                <div class="item-quantity">
                                    <label>Quantity:</label>
                                    <input
                                            type="number"
                                            min="1"
                                            .value=${item.quantity.toString()}
                                            @change=${(e: Event) => this.handleQuantityChange(item.itemId, e)}
                                    />
                                </div>

                                <div class="item-subtotal">
                                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                                </div>

                                <button
                                        class="btn-remove"
                                        @click=${() => this.handleRemoveItem(item.itemId)}
                                >
                                    Remove
                                </button>
                            </div>
                        `)}
                    </div>

                    <div class="cart-summary">
                        <div class="summary-row">
                            <span>Subtotal:</span>
                            <span>$${this.calculateTotal().toFixed(2)}</span>
                        </div>
                        <div class="summary-row total">
                            <span>Total:</span>
                            <span>$${this.calculateTotal().toFixed(2)}</span>
                        </div>

                        <div class="cart-actions">
                            <a href="/app/products" class="btn-continue">Continue Shopping</a>
                            <button class="btn-checkout" disabled>
                                Checkout (Coming Soon)
                            </button>
                        </div>
                    </div>
                </div>
        `;
    }
}

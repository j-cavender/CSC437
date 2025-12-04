import {html} from "lit";
import {state} from "lit/decorators.js";
import {View} from "@calpoly/mustang";
import {PotteryItem} from "server/models";
import {Msg} from "../messages";
import {Model} from "../model";
import tokens from "../styles/tokens.css.js";
import commonStyles from "../styles/common.css.js";
import productsStyles from "../styles/products-view.css.js";

export class ProductsViewElement extends View<Model, Msg> {
    static styles = [tokens.styles, commonStyles.styles, productsStyles.styles];

    @state()
    get products(): PotteryItem[] | undefined {
        return this.model.products;
    }

    @state()
    selectedCategory: string = "all";

    constructor() {
        super("pottery:model");
    }

    connectedCallback() {
        super.connectedCallback();
        this.dispatchMessage(["products/request", {}]);
    }

    get categories(): string[] {
        if (!this.products) return [];
        const types = new Set(this.products.map(p => p.type));
        return Array.from(types).sort();
    }

    get filteredProducts(): PotteryItem[] {
        if (!this.products) return [];

        if (this.selectedCategory === "all") {
            return this.products;
        }

        return this.products.filter(p => p.type === this.selectedCategory);
    }

    handleCategoryChange(category: string) {
        this.selectedCategory = category;
    }

    render() {
        const filteredProducts = this.filteredProducts;

        return html`
            <div class="page-container">
                <div class="content-wrapper">
                    <h1>Products</h1>

                    <div class="category-pills">
                        <button
                                class="pill ${this.selectedCategory === "all" ? "active" : ""}"
                                @click=${() => this.handleCategoryChange("all")}
                        >
                            All
                        </button>
                        ${this.categories.map(category => html`
                            <button
                                    class="pill ${this.selectedCategory === category ? "active" : ""}"
                                    @click=${() => this.handleCategoryChange(category)}
                            >
                                ${category}
                            </button>
                        `)}
                    </div>

                    <div class="products-container">
                        ${filteredProducts.length > 0 ? html`
                            <pottery-list .products=${filteredProducts}></pottery-list>
                        ` : html`
                            <div class="empty-state">
                                <p>No products in this category</p>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
    }
}
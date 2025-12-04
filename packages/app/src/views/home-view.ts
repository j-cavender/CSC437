import {html, LitElement} from "lit";
import tokens from "../styles/tokens.css.js";
import commonStyles from "../styles/common.css.js";
import homeStyles from "../styles/home-view.css.js";

export class HomeViewElement extends LitElement {
    static styles = [tokens.styles, commonStyles.styles, homeStyles.styles];

    render() {
        return html`
            <div class="hero-container">
                <div class="content-wrapper">
                    <div class="text-content">
                        <div class="label">Handcrafted Ceramics</div>
                        <h1>
                            Where <span class="highlight">clay</span><br/>
                            becomes art
                        </h1>
                        <p class="description">
                            Discover unique, hand-thrown pottery pieces that bring warmth
                            and character to your space. Each creation tells a story of
                            tradition, craft, and timeless beauty.
                        </p>
                        <div class="cta-container">
                            <a href="/app/products" class="btn btn-primary">
                                <span>Explore Collection</span>
                            </a>
                        </div>
                    </div>

                    <div class="visual-content">
                        <div class="pottery-display">
                            <div class="pottery-card card-1">
                                <img src="/img/bowl1.png" alt="Handcrafted pottery bowl" class="card-image">
                            </div>
                            <div class="pottery-card card-2">
                                <img src="/img/bowl2.png" alt="Artisan ceramic bowl" class="card-image">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

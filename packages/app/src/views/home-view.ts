import { css, html, LitElement } from "lit";

export class HomeViewElement extends LitElement {
    render() {
        return html`
            <div class="hero-container">
                <div class="geometric-accent accent-1"></div>
                <div class="geometric-accent accent-2"></div>

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
                            <button class="btn btn-primary">
                                <span>Explore Collection</span>
                            </button>
                            <button class="btn btn-secondary">
                                <span>Our Process</span>
                            </button>
                        </div>
                    </div>

                    <div class="visual-content">
                        <div class="pottery-display">
                            <div class="pottery-card card-1">
                                <div class="card-image">Vessel I</div>
                            </div>
                            <div class="pottery-card card-2">
                                <div class="card-image">Bowl II</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="stats-bar">
                    <div class="stat">
                        <span class="stat-number">250+</span>
                        <span class="stat-label">Unique Pieces</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">15</span>
                        <span class="stat-label">Years Crafting</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">100%</span>
                        <span class="stat-label">Handmade</span>
                    </div>
                </div>
            </div>
        `;
    }
}

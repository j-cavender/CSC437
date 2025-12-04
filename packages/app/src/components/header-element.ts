import {html} from 'lit';
import {property, state} from "lit/decorators.js";
import {View, Observer, Auth, Events} from "@calpoly/mustang";
import {Model} from "../model";
import {Msg} from "../messages";
import reset from "../styles/reset.css";
import tokens from "../styles/tokens.css";
import headerStyles from "../styles/header-element.css";

export class HeaderElement extends View<Model, Msg> {
    @property({type: String, attribute: 'page-title'})
    pageTitle: string = "Products";

    @state()
    loggedIn = false;

    @state()
    userid?: string;

    @state()
    get displayName(): string | undefined {
        return this.model.profile?.displayName;
    }

    @state()
    get darkMode(): boolean {
        return this.model.profile?.darkMode ?? false;
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
                this.loggedIn = true;
                this.userid = user.username;
                this.dispatchMessage(["profile/request", {userid: user.username}]);
            } else {
                this.loggedIn = false;
                this.userid = undefined;
                document.body.classList.remove("dark-mode");
            }
        });
    }

    updated() {
        if (this.darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }

    renderSignInButton() {
        return html`
            <a href="/app/login" class="auth-button">
                Sign In
            </a>
        `;
    }

    renderSignOutButton() {
        return html`
            <button
                    class="auth-button"
                    @click=${(e: UIEvent) => {
                        Events.relay(e, "auth:message", ["auth/signout"])
                    }}
            >
                Sign Out
            </button>
        `;
    }

    render() {
        void this.darkMode;

        return html`
            <header>
                <div class="header-inner">
                    <h1>${this.pageTitle}</h1>

                    <nav class="main-nav">
                        <a href="/app" class="nav-link">Home</a>
                        <a href="/app/products" class="nav-link">Products</a>
                        ${this.loggedIn ? html`
                            <a href="/app/cart" class="nav-link">Cart</a>
                            <a href="/app/profile" class="nav-link">Profile</a>
                        ` : ''}
                    </nav>

                    <div class="header-controls">
                        <section class="user-control">
                            <span class="user-greeting">
                                Hello, ${this.displayName || this.userid || "guest"}
                            </span>
                            ${this.loggedIn ?
                                    this.renderSignOutButton() :
                                    this.renderSignInButton()
                            }
                        </section>
                    </div>
                </div>
            </header>
        `;
    }

    static styles = [
        reset.styles,
        tokens.styles,
        headerStyles.styles
    ];
}
import { html, css, LitElement } from 'lit';
import { property, state } from "lit/decorators.js";
import { Observer, Auth, Events } from "@calpoly/mustang";
import reset from "./styles/reset.css.ts";

export class HeaderElement extends LitElement {
    @property({ type: String, attribute: 'page-title' })
    pageTitle: string = "Products";

    @state()
    darkMode: boolean = false;

    @state()
    loggedIn = false;

    @state()
    userid?: string;

    _authObserver = new Observer<Auth.Model>(this, "pottery:auth");

    connectedCallback() {
        super.connectedCallback();

        this._authObserver.observe((auth: Auth.Model) => {
            const { user } = auth;
            if (user && user.authenticated) {
                this.loggedIn = true;
                this.userid = user.username;
            } else {
                this.loggedIn = false;
                this.userid = undefined;
            }
        });
    }

    handleDarkModeToggle(event: Event) {
        const input = event.target as HTMLInputElement;
        this.darkMode = input.checked;

        const customEvent = new CustomEvent("dark-mode:toggle", {
            bubbles: true,
            composed: true,
            detail: { checked: this.darkMode },
        });
        this.dispatchEvent(customEvent);
    }

    renderSignInButton() {
        return html`
            <a href="/login.html" class="auth-button">
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
        return html`
            <header>
                <h1>${this.pageTitle}</h1>
                <div class="header-controls">
                    <section class="user-control">
                        <span class="user-greeting">
                            Hello, ${this.userid || "guest"}
                        </span>
                        ${this.loggedIn ?
                                this.renderSignOutButton() :
                                this.renderSignInButton()
                        }
                    </section>
                    <label @change=${this.handleDarkModeToggle}>
                        <input type="checkbox" autocomplete="off" .checked=${this.darkMode} />
                        Dark Mode
                    </label>
                </div>
            </header>
        `;
    }

    static styles = [
        reset.styles,
        css`
            :host {
                grid-column: 1 / -1;
            }

            header {
                background-color: var(--color-background-header);
                color: var(--color-text-header);
                font-family: var(--font-family-sans-serif);
                font-weight: bold;
                font-size: large;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 1rem;
            }

            .header-controls {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                gap: 0.5rem;
            }

            .user-control {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .user-greeting {
                color: var(--color-text-header);
            }

            .auth-button {
                background-color: transparent;
                border: 1px solid var(--color-text-header);
                color: var(--color-text-header);
                padding: 0.25rem 0.75rem;
                border-radius: 4px;
                text-decoration: none;
                font-size: 0.9rem;
                transition: background-color 0.2s;
            }

            .auth-button:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }

            button.auth-button {
                cursor: pointer;
            }

            label {
                cursor: pointer;
            }
        `
    ];
}
import {html, css} from "lit";
import {state, property} from "lit/decorators.js";
import {define, View, Observer, Auth, Form, History} from "@calpoly/mustang";
import {Profile} from "server/models";
import {Msg} from "../messages";
import {Model} from "../model";
import tokens from "../styles/tokens.css.js";
import commonStyles from "../styles/common.css.js";
import profileStyles from "../styles/profile-view.css.js";

export class ProfileViewElement extends View<Model, Msg> {
    static uses = define({
        "mu-form": Form.Element
    });

    static styles = [
        tokens.styles,
        commonStyles.styles,
        profileStyles.styles,
        css`
            mu-form {
                display: block;
            }

            mu-form label {
                display: block;
                grid-column: 1 / -1;
            }

            .btn-secondary {
                width: 100%;
                margin-top: 0.5rem;
            }

            .toggle-section {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: var(--space-md, 1rem) 0;
                border-top: 1px solid var(--color-border, #d0d0d0);
                margin-top: var(--space-md, 1rem);
            }

            .toggle-label {
                display: flex;
                align-items: center;
                gap: var(--space-sm, 0.5rem);
                cursor: pointer;
            }

            .toggle-label input[type="checkbox"] {
                width: 1.25rem;
                height: 1.25rem;
                cursor: pointer;
            }
        `
    ];

    @property()
    userid?: string;

    @property()
    mode: "view" | "edit" = "view";

    @state()
    get profile(): Profile | undefined {
        return this.model.profile;
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
                this.dispatchMessage(["profile/request", {userid: user.username}]);
            } else {
                this.userid = undefined;
            }
        });
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (name === "userid" && newValue && newValue !== oldValue) {
            this.dispatchMessage(["profile/request", {userid: newValue}]);
        }
    }

    render() {
        return this.mode === "edit" ?
            this.renderEditor() :
            this.renderView();
    }

    renderView() {
        const profile = this.profile;

        if (!this.userid) {
            return html`
                <div class="view-container">
                    <p>Please log in to view your profile.</p>
                </div>
            `;
        }

        if (!profile) {
            return html`
                <div class="view-container">
                    <p>Loading profile...</p>
                </div>
            `;
        }

        return html`
            <div class="view-container">
                <div class="card profile-card">
                    <h2>User Profile</h2>

                    <div class="profile-section">
                        <span>Username:</span>
                        <div class="profile-value">${this.userid}</div>
                    </div>

                    <div class="profile-section">
                        <span>Display Name:</span>
                        <div class="profile-value">${profile.displayName || 'Not set'}</div>
                    </div>

                    <div class="profile-section">
                        <span>Password:</span>
                        <div class="profile-value">••••••••</div>
                    </div>

                    <button type="button" class="btn-primary" @click=${() => {
                        History.dispatch(this, "history/navigate", {
                            href: `/app/profile/${this.userid}/edit`
                        });
                    }}>
                        Edit Profile
                    </button>

                    <div class="toggle-section">
                        <label class="toggle-label">
                            <input
                                    type="checkbox"
                                    autocomplete="off"
                                    ?checked=${profile.darkMode}
                                    @change=${this.handleDarkModeToggle}
                            />
                            Dark Mode
                        </label>
                    </div>
                </div>
            </div>
        `;
    }

    renderEditor() {
        const profile = this.profile;

        if (!this.userid) {
            return html`
                <div class="view-container">
                    <p>Please log in to edit your profile.</p>
                </div>
            `;
        }

        if (!profile) {
            return html`
                <div class="view-container">
                    <p>Loading profile...</p>
                </div>
            `;
        }

        return html`
            <div class="view-container">
                <div class="card profile-card">
                    <h2>Edit Profile</h2>

                    <mu-form .init=${profile} @mu-form:submit=${this.handleSubmit}>
                        <label>
                            <span>Username:</span>
                            <div class="profile-value">${this.userid}</div>
                        </label>

                        <label>
                            <span>Display Name:</span>
                            <input
                                    name="displayName"
                                    type="text"
                            />
                        </label>

                        <label>
                            <span>Password:</span>
                            <input
                                    type="password"
                                    name="password"
                                    placeholder="Leave blank to keep current password"
                            />
                        </label>
                    </mu-form>

                    <button
                            type="button"
                            class="btn-secondary"
                            @click=${() => {
                                History.dispatch(this, "history/navigate", {
                                    href: `/app/profile/${this.userid}`
                                });
                            }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        `;
    }

    handleSubmit(event: Form.SubmitEvent<Profile>) {
        if (this.userid) {
            this.dispatchMessage([
                "profile/save",
                {
                    userid: this.userid,
                    profile: event.detail
                },
                {
                    onSuccess: () => {
                        History.dispatch(this, "history/navigate", {
                            href: `/app/profile/${this.userid}`
                        });
                    },
                    onFailure: (error: Error) => {
                        console.error("Failed to update profile:", error);
                    }
                }
            ]);
        }
    }

    handleDarkModeToggle(event: Event) {
        const checkbox = event.target as HTMLInputElement;
        const profile = this.profile;

        this.applyDarkMode(checkbox.checked);

        if (this.userid && profile) {
            this.dispatchMessage([
                "profile/save",
                {
                    userid: this.userid,
                    profile: {...profile, darkMode: checkbox.checked}
                },
                {
                    onSuccess: () => {
                    },
                    onFailure: (error: Error) => {
                        console.error("Failed to save dark mode preference:", error);
                        checkbox.checked = !checkbox.checked;
                        this.applyDarkMode(checkbox.checked);
                    }
                }
            ]);
        }
    }

    applyDarkMode(enabled: boolean) {
        if (enabled) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }
}
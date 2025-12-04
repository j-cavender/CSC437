import {html, css, LitElement} from "lit";
import {property, state} from "lit/decorators.js";
import reset from "../styles/reset.css";

interface LoginFormData {
    username?: string;
    password?: string;
}

export class LoginFormElement extends LitElement {

    @state()
    formData: LoginFormData = {};

    @property()
    api?: string;

    @property()
    redirect: string = "/app";

    @state()
    error?: string;

    get canSubmit(): boolean {
        return Boolean(this.api && this.formData.username &&
            this.formData.password);
    }

    override render() {
        return html`
            <form
                    @change=${(e: InputEvent) => this.handleChange(e)}
                    @submit=${(e: SubmitEvent) => this.handleSubmit(e)}
            >
                <slot></slot>
                <slot name="button">
                    <button
                            ?disabled=${!this.canSubmit}
                            type="submit">
                        Login
                    </button>
                </slot>
                <p class="error">${this.error}</p>
            </form>
        `;
    }

    static styles = [
        reset.styles,
        css`
            button[type="submit"] {
                width: 100%;
                padding: var(--space-md) var(--space-xl);
                background-color: var(--color-background-header);
                color: var(--color-text-header);
                border: none;
                border-radius: var(--radius-md);
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all var(--transition-base);
                margin-top: var(--space-md);
            }

            button[type="submit"]:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: var(--shadow-lg);
            }

            button[type="submit"]:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .error:not(:empty) {
                color: #d32f2f;
                border: 1px solid #d32f2f;
                padding: var(--space-md);
                border-radius: var(--radius-md);
                margin-top: var(--space-md);
            }
        `];

    handleChange(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        const name = target?.name;
        const value = target?.value;
        const prevData = this.formData;

        switch (name) {
            case "username":
                this.formData = {...prevData, username: value};
                break;
            case "password":
                this.formData = {...prevData, password: value};
                break;
        }
    }

    handleSubmit(submitEvent: SubmitEvent) {
        submitEvent.preventDefault();

        if (this.canSubmit) {
            fetch(
                this?.api || "",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.formData)
                }
            )
                .then((res) => {
                    if (res.status !== 200)
                        throw "Login failed";
                    else return res.json();
                })
                .then((json: object) => {
                    const {token} = json as { token: string };
                    const customEvent = new CustomEvent(
                        'auth:message', {
                            bubbles: true,
                            composed: true,
                            detail: [
                                'auth/signin',
                                {token, redirect: this.redirect}
                            ]
                        });
                    this.dispatchEvent(customEvent);
                })
                .catch((error: Error) => {
                    console.log(error);
                    this.error = error.toString();
                });
        }
    }
}
import {html, css, LitElement} from "lit";
import {property, state} from "lit/decorators.js";
import reset from "../styles/reset.css";

interface SignupFormData {
    username?: string;
    password?: string;
    confirmPassword?: string;
}

export class SignupFormElement extends LitElement {

    @state()
    formData: SignupFormData = {};

    @property()
    api?: string;

    @property()
    redirect: string = "/app";

    @state()
    error?: string;

    get canSubmit(): boolean {
        return Boolean(
            this.api &&
            this.formData.username &&
            this.formData.password &&
            this.formData.confirmPassword &&
            this.formData.password === this.formData.confirmPassword
        );
    }

    get passwordsMatch(): boolean {
        if (!this.formData.password || !this.formData.confirmPassword) {
            return true;
        }
        return this.formData.password === this.formData.confirmPassword;
    }

    override render() {
        return html`
            <form
                    @change=${(e: InputEvent) => this.handleChange(e)}
                    @submit=${(e: SubmitEvent) => this.handleSubmit(e)}
            >
                <slot></slot>
                ${!this.passwordsMatch
                        ? html`<p class="password-mismatch">Passwords do not match</p>`
                        : ""}
                <slot name="button">
                    <button
                            ?disabled=${!this.canSubmit}
                            type="submit">
                        Sign Up
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

            .password-mismatch {
                color: #d32f2f;
                font-size: 0.875rem;
                margin: 0 0 var(--space-md) 0;
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
            case "confirmPassword":
                this.formData = {...prevData, confirmPassword: value};
                break;
        }
    }

    handleSubmit(submitEvent: SubmitEvent) {
        submitEvent.preventDefault();

        if (this.canSubmit) {
            const {confirmPassword, ...submitData} = this.formData;

            fetch(
                this?.api || "",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(submitData)
                }
            )
                .then((res) => {
                    if (res.status !== 201)
                        throw "Signup failed";
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
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { animate } from "@lit-labs/motion";
import { pageStyles } from "./css/page.css";

@customElement('page-one')
export class PageOne extends LitElement {
  static get styles()  {
    return [
      pageStyles
    ]
  }

  constructor() {
    super();
    this.visible = false;
  }

  @property()
  visible: boolean;

  connectedCallback(): void {
    super.connectedCallback()
    setTimeout(() => this.visible = true, 2000) 
  }

  render() {
    return html`
      <article>
        <h1>Page One</h1>
        <img src="../public/ralph.jpg">
        <p>I'm page one!</p>
      </article>
      <aside class="${this.visible ? 'visible' : ''}" ${animate()}><p>Sure you are Ralph.</p></aside>
    `;
  }
}
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
      <!-- here we add a post-render animation; I found that a slight delay was
        necessary in order for the animation to not be swallowed by the render -->
      <!-- I also lengthened it a little more than needed for dramatic effect;
        200ms would have done the trick -->
      <aside class="${this.visible ? 'visible' : ''}" ${animate()}><p>Sure you are Ralph.</p></aside>
    `;
  }
}
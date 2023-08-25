import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Router } from "@lit-labs/router";
import { animate } from "@lit-labs/motion";
import { classMap } from "lit/directives/class-map.js";
import "./page-root";
import "./page-one";
import "./page-two";

const updatePage = (pageStates: {}, page:string) => {
  for (const state of Object.entries(pageStates)) {
    const [key] = state;

    pageStates[key] = page === key ? true : false
  }
}

// Conditional ESM module loading (Node.js and browser)
// @ts-ignore: Property 'UrlPattern' does not exist 
if (!globalThis.URLPattern) { 
  await import("urlpattern-polyfill");
}
/** 
 * The above is the recommended way to load the ESM module, as it only
 * loads it on demand, thus when not natively supported by the runtime or
 * already polyfilled.
 */
import "urlpattern-polyfill";

/** 
 * In case you want to replace an existing implementation with the polyfill:
 */
import {URLPattern} from "urlpattern-polyfill";
globalThis.URLPattern = URLPattern;

@customElement("sample-app")
export class App extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      left: 0px;
      position: relative;
      width: 100%;
    }

    nav {
      display: flex;
    }

    nav a {
      padding: 1em;
    }

    .page-root {
      background-color: orange;
      color: blue;
      display: inline-block;
      left: 0;
      position: relative;
      width: auto;
    }

    .page-one {
      background-color: blue;
      color: orange;
      display: inline-block;
      left: 50px;
      position: relative;
      width: auto;
    }

    .page-two {
      background-color: green;
      color: blue;
      display: inline-block;
      left: 100px;
      position: relative;
      width: auto;
    }
  `;

  @property()
  currentPage = {'page-root': true, 'page-one': false, 'page-two': false}

  private _router = new Router(this, [
    {
      pattern: new URLPattern({ pathname: "/" }),
      render: () => {
        updatePage(this.currentPage, 'page-root');
        
        return html`<page-root></page-root>`},
    },
    {
      pattern: new URLPattern({ pathname: "/1" }),
      render: () => {
        updatePage(this.currentPage, 'page-one');
        
        return html`<page-one></page-one>`},
    },
    {
      pattern: new URLPattern({ pathname: "/2" }),
      render: () => {
        updatePage(this.currentPage, 'page-two')
        
        return html`<page-two></page-two>`
      },
    }
  ]);

  render() {
    return html`
        <nav>
          <a href="/">home</a>
          <a href="/1">one</a>
          <a href="/2">two</a>
        </nav>
        <!-- here we define the animation configuration for all components loaded directly into the router's outlet -->
        <!-- we are able to animate most things about it's rel -->
        <section class=${classMap(this.currentPage)} ${animate({
          keyframeOptions: {
            duration: 300,
            easing: 'ease-in-out'
          },
          properties: ['left', 'opacity', 'color', 'background', 'background-color']
        })}>${this._router.outlet()}</section>
    `;
  }
}
import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const logo = new URL('../../assets/open-wc-logo.svg', import.meta.url).href;

export class SseDemoApp extends LitElement {
  @property({ type: String }) title = 'My app';

  @state() eventSource: any;

  @state() messages: string = '';

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--sse-demo-app-background-color);
    }

    main {
      flex-grow: 1;
    }

    .logo {
      margin-top: 36px;
      animation: app-logo-spin infinite 20s linear;
    }

    @keyframes app-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    // Listen for the server side events
    this.eventSource = new EventSource('http://localhost:3000/sse');
    this.eventSource.onmessage = (message:any) => {
      const { lastEventId, data }: any = message;
      this.messages = `id: ${lastEventId} <br/> ${data}`;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.eventSource.close();
  }

  render() {
    return html`
      <main>
        <div class="logo"><img alt="open-wc logo" src=${logo} /></div>
        <h1>${this.title}</h1>

        ${unsafeHTML(this.messages)}
      </main>

      <p class="app-footer">
        🚽 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/open-wc"
          >open-wc</a
        >.
      </p>
    `;
  }
}

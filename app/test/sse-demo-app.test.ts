import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import { SseDemoApp } from '../src/SseDemoApp.js';
import '../src/sse-demo-app.js';

describe('SseDemoApp', () => {
  let element: SseDemoApp;
  beforeEach(async () => {
    element = await fixture(html`<sse-demo-app></sse-demo-app>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

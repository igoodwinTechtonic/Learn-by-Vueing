// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//

/**
 * Simulates a paste event.
 * Modified from https://gist.github.com/nickytonline/bcdef8ef00211b0faf7c7c0e7777aaf6
 *
 * @param subject A jQuery context representing a DOM element.
 * @param pasteOptions Set of options for a simulated paste event.
 * @param pasteOptions.pastePayload Simulated data that is on the clipboard.
 * @param pasteOptions.pasteFormat The format of the simulated paste payload. Default value is 'text'.
 *
 * @returns The subject parameter.
 *
 * @example
 * cy.get('body').paste({
 *   pasteType: 'application/json',
 *   pastePayload: {hello: 'yolo'},
 * });
*/
Cypress.Commands.add(
  'paste',
  { prevSubject: true },
  function (subject, pasteOptions) {
    const { pastePayload, pasteType } = pasteOptions;
    const data = pasteType === 'application/json' ? JSON.stringify(pastePayload) : pastePayload;
    // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
    const clipboardData = new DataTransfer();
    clipboardData.setData(pasteType, data);
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
    const pasteEvent = new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
      dataType: pasteType,
      data,
      clipboardData,
    });
    subject[0].dispatchEvent(pasteEvent);

    return subject;
  }
);
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

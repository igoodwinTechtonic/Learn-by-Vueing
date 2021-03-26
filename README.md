# Bugs

## BUG REPORT - 25 March 2021

> Bug 001 - When adding a folder, searching icons does not display correct results

### To replicate

1. Click the Add Folder button to add a folder
2. Type "python" into the icon input field. Nothing shows up!
3. Now type "language". All the icons for the programming languages appear, including the python icon!

### Current functionality

On `@keyup`, the input text in the field is sent to this searchIcons and searches based on the text that comes immediately after `mdi`, instead of searching any matching characters in the string.

`this.filteredIcons` - a local state variable to hold an array of filtered icons  
`this.icons` - a local state variable to hold an array of all icons from mdijs package

```js
searchIcons(input) {
  this.filteredIcons = this.icons.filter((icon) =>
    icon.includes('mdi' + input.charAt(0).toUpperCase() + input.slice(1))
  );
},
```

For example. searching "language" displays all the programming language icons because the mdi icon names for the icons look like this:

```js
// ...
export declare const mdiLanguageMarkdown: string;
export declare const mdiLanguageMarkdownOutline: string;
export declare const mdiLanguagePhp: string;
export declare const mdiLanguagePython: string;
export declare const mdiLanguageR: string;
export declare const mdiLanguageRuby: string;
export declare const mdiLanguageRubyOnRails: string;
// ...
```

### Proposed functionality

Logic to search based on matches at any point in the string, rather than what comes immediately after `mdi`.

---

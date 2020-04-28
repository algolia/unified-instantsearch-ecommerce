# E-Commerce Unified UI

<p align="center">
<img src="https://cl.ly/c3fa6a6b250a/Screenshot%2525202019-05-27%252520at%25252010.17.35.png" />
</p>

**This project aims to be used by any e-commerce website to bootstrap a search experience powered by Algolia the fastest way possible.**

While you would still have to push your data to Algolia, the goal of E-Commerce Unified is to remove the need of implementing front-end logic and be able to start using Algolia as quickly as possible.

### Prerequisites

- Node >= 12
- Yarn

// @todo @sarah

### Getting started

Follow the few steps described below to start using E-Commerce Unified UI.

1. **Push your data to Algolia** (following the [required data schema](#customizing-the-search-ui)),
2. [**Fork** this Github repository](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) to your own,
3. **Replace the values in `src/config/index.js`** to better match your needs,
4. **Run `npm run build` (or `yarn build`)** to build the `unified-instantsearch.js` files,
5. **Host and include the `unified-instantsearch.js` file** on your front-end and start using!

#### Instructions

// @todo @sarah

#### Commands

You have access to a handful of [command-line scripts](https://docs.npmjs.com/misc/scripts) to test your project during customization and build it once you're done.

You can run each command with npm or Yarn. For example, to run the `start` command, you can run either `npm run start` or `yarn start`.

| Command Name | Comments                                                                      |
| ------------ | ----------------------------------------------------------------------------- |
| `start`      | Run the project in development mode, within a fake e-commerce website.        |
| `preview`    | Build the project for previewing in the context of a fake e-commerce website. |
| `export`     | Export the production JavaScript file to include in your website.             |
| `lint`       | Look for linting issues (useful when customizing the project).                |
| `lint:js`    | Look for linting issues in the JavaScript code.                               |
| `lint:css`   | Look for linting issues in the CSS/Sass code.                                 |

### Configuration options

// @todo @francois

The `src/config/index.js` file describe the multiple available options to be used with E-Commerce Unified UI.

| Option Name      | Type     | Required | Comments                                                                             |
| ---------------- | -------- | -------- | ------------------------------------------------------------------------------------ |
| appId            | `string` | Yes      | Set your Algolia Application ID (accessible from the Dashboard)                      |
| searchApiKey     | `string` | Yes      | Set your Algolia Search API Key (accessible from the Dashboard)                      |
| indexName        | `string` | Yes      | Set your Algolia Index name                                                          |
| inputSelector    | `string` | Yes      | Set the DOM element that triggers the Search Results overlay                         |
| suggestions      | `object` | No       | Set the Query Suggestions options (`appId`, `apiKey`, `indexName`, `maxSuggestions`) |
| googleAnalytics  | `bool`   | No       | Enable Google Analytics tracking (Google script need to be included on your page)    |
| searchParameters | `object` | No       | Parameters to pass to the InstantSearch widget                                       |
| hits             | `object` | Yes      | Set the Hits option (`hitsPerPage` and `render()`)                                   |
| refinements      | `object` | No       | Set the different Refinements available                                              |
| sorts            | `object` | No       | Set the different Sorts available                                                    |

### Customizing the search UI

// @todo @francois

#### Refinements

// @todo @francois

##### Schema

###### Record schema

###### Options

##### Hierarchical

###### Record schema

###### Options

##### Color

###### Record schema

###### Options

##### List

###### Record schema

###### Options

##### Size

###### Record schema

###### Options

##### Slider

###### Record schema

###### Options

##### Category

###### Record schema

###### Options

// @todo @francois

#### Sorting

// @todo @francois

### Adjusting the styling to your theme

The `src/config/variables.scss` file lets you adjust E-Commerce Unified UI to your branding and the style of your website.

| Sass Variables    | Comments                                                    |
| ----------------- | ----------------------------------------------------------- |
| \$color-primary   | The accent color, typically the main color of your branding |
| \$color-secondary | The secondary color, for most of the text content           |
| \$font-family     | The global font stack                                       |
| \$breakpoint-sm   | The breakpoint for small devices                            |
| \$breakpoint-md   | The breakpoint for medium devices                           |
| \$breakpoint-lg   | The breakpoint for large devices                            |

#### Customizing colors

You can modify the color variables (prefixed with `$color-`) to adapt the design to your needs.

Internally, we use [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) with a static fallback for browsers that don't support it. If you want to leverage CSS custom properties, for example, to implement multiple color themes, you can set the color variables as your initial values (and fallback for older browsers), and override them in the desired context by setting the corresponding CSS custom properties in your own CSS.

| Sass Variable     | CSS Custom Property       |
| ----------------- | ------------------------- |
| \$color-primary   | --algolia-theme-primary   |
| \$color-secondary | --algolia-theme-secondary |

#### Customizing breakpoints

You can modify the breakpoint variables (prefixed with `$breakpoint-`) to reflect the ones of your website. Because we use these breakpoints in the JavaScript code, you also need to reflect these edits in `src/config/index.js` under the `styles.breakpoints` property.

Please note that we've adapted the design of Unified InstantSearch to the default breakpoints that we've set. If you change them, make sure the layout still works the way you expect.

#### Customizing text

By default, we use system fonts in Unified InstantSearch, but you can tailor this to your needs by changing the `$font-family` variable.

If you want to use the same font stack as your main website, we recommend you change the value to `inherit`.

### Disclaimer

> E-Commerce Unified UI is made accessible to you for trial and/or experimentation purposes. You may decide to use it or not. You are aware that use of E-Commerce Unified UI in production may increase your consumption of the Service, including [Queries Per Second](https://www.algolia.com/doc/faq/monitoring/which-queries-are-counted-as-part-of-the-max-qps-computations/).

> Algolia does not support E-Commerce Unified UI, and may discontinue it at any time at its sole discretion; configurations and/or customisations entered by you into E-Commerce Unified UI may be permanently lost. Any feedback (including source code) you may provide to us regarding E-Commerce Unified UI may be used by Algolia to improve the Service.

> E-Commerce Unified UI source code is provided “as is” and “as available” without any warranty of any kind. Algolia disclaims all obligation and liability for any harm or damage arising out of or in connection with E-Commerce Unified UI. For purposes of our [SLA](https://www.algolia.com/policies/sla), the E-Commerce Unified UI is not an “API Client”.

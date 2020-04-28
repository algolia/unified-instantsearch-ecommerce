# E-Commerce Unified UI

<p align="center">
<img src="https://cl.ly/c3fa6a6b250a/Screenshot%2525202019-05-27%252520at%25252010.17.35.png" />
</p>

**This project aims to be used by any e-commerce website to bootstrap a search experience powered by Algolia the fastest way possible.**

While you would still have to push your data to Algolia, the goal of E-Commerce Unified is to remove the need of implementing front-end logic and be able to start using Algolia as quickly as possible.

### Getting started

Follow the few steps described below to start using E-Commerce Unified UI.

1. **Push your data to Algolia** (following the [required data schema](#customizing-the-search-ui)),
2. [**Fork** this Github repository](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) to your own,
3. **Replace the values in `src/config/index.js`** to better match your needs,
4. **Run `npm run build` (or `yarn build`)** to build the `unified-instantsearch.js` file,
5. **Host and include the `unified-instantsearch.js` file** on your front-end and start using!

#### Instructions

##### Prerequisites

To run and build the project, you need:
- to create a [GitHub account](https://github.com/join/),
- and to install [Node.js 12.x](https://nodejs.org/en/).

We use [Yarn](https://yarnpkg.com/) and recommend you use it too to install and manage dependencies. If you prefer using [npm CLI](https://docs.npmjs.com/cli/npm) (built-in with Node.js), make sure to delete `yarn.lock` to avoid having conflicting lock files.

> Once you've picked either npm CLI or Yarn, **we recommend you stick to this choice**. Both tools generate different, incompatible lock files, which define what exact version of each dependency the project should use. Using both tools could break your final JavaScript file.

##### Forking and installing the project

We provide Unified InstantSearch as a repository that you can [fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) and run on your own.

To do so, you need to navigate to the [main repository](https://github.com/algolia/ecomm-unified/) and click **Fork** at the top-right corner of the page. It creates a tracked copy of the repository on your GitHub account. Go to the fork and click the **Clone or download** to clone the project on your machine. We recommend you clone instead of downloading a ZIP archive so you can later easily [update the project](#updating-the-project).

Once you've cloned the fork on your machine, you can add the original upstream repository to facilitate updates.

```sh
git remote add upstream https://github.com/algolia/ecomm-unified.git
```

When you clone the project for the first time, or when you update it with the latest changes, you need to install dependencies. It must happen **before** using any of the provided commands.

```sh
yarn # or `npm install`
```

##### Running the project locally

If you're customizing the project, you may want to test it out and see if it works before building it and adding it to your production website. We provide a fake e-commerce website in which you can run the project locally. It's useful to see your changes live while you're developing, and test them out before going to production.

```sh
yarn start # or `npm run start`
```

##### Previewing the project in production conditions

When running the project locally (with the `start` command), you're in a development environment that comes with tooling to help you code and debug more quickly. It has an impact on performance, which doesn't give you a realistic idea of how fast and fluid the final experience is. For this reason, we provide a way for you to preview the project in the same way as with the `start` command, but in production conditions.

```sh
yarn preview # or `npm run preview`
npx serve --port 5000 preview
open http://localhost:5000/
```

##### Exporting the project

Once you've customized the project and made sure it works properly, you need to export it into a JavaScript file that you then must include on your production website.

```sh
yarn export # or `npm run export`
```

Then, include the generated `unified-instantsearch.js` file in your project.

##### Updating the project

Whenever we change the project, you can [sync the latest changes in your fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork).

```sh
git fetch upstream
git checkout master
git merge upstream/master
```

> **You need to test any change to your project to make sure it still works correctly in every environment where you intend to serve it**. We're versioning the project using the [Semantic Versioning](https://semver.org/) convention, using tags for each release. Before syncing your fork, make sure whether the changes are breaking or not, and whether they are compatible with your changes.

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

#### Customizing text

### Disclaimer

> E-Commerce Unified UI is made accessible to you for trial and/or experimentation purposes. You may decide to use it or not. You are aware that use of E-Commerce Unified UI in production may increase your consumption of the Service, including [Queries Per Second](https://www.algolia.com/doc/faq/monitoring/which-queries-are-counted-as-part-of-the-max-qps-computations/).

> Algolia does not support E-Commerce Unified UI, and may discontinue it at any time at its sole discretion; configurations and/or customisations entered by you into E-Commerce Unified UI may be permanently lost. Any feedback (including source code) you may provide to us regarding E-Commerce Unified UI may be used by Algolia to improve the Service.

> E-Commerce Unified UI source code is provided “as is” and “as available” without any warranty of any kind. Algolia disclaims all obligation and liability for any harm or damage arising out of or in connection with E-Commerce Unified UI. For purposes of our [SLA](https://www.algolia.com/policies/sla), the E-Commerce Unified UI is not an “API Client”.

# Unified InstantSearch E-Commerce <!-- omit in toc -->

<p align="center">
<img src="https://cl.ly/c3fa6a6b250a/Screenshot%2525202019-05-27%252520at%25252010.17.35.png" />
</p>

**This project aims to be used by any e-commerce website to bootstrap a search experience powered by Algolia the fastest way possible.**

While you would still have to push your data to Algolia, the goal of E-Commerce Unified is to remove the need to implement front-end logic and be able to start using Algolia as quickly as possible.

## Table of contents <!-- omit in toc -->

- [Getting started](#getting-started)
  - [Instructions](#instructions)
  - [Commands](#commands)
- [Configuration options](#configuration-options)
  - [`appId`](#appid)
  - [`apiKey`](#apikey)
  - [`index`](#index)
  - [`suggestionsIndex`](#suggestionsindex)
  - [`inputContainer`](#inputcontainer)
  - [`inputContent`](#inputcontent)
  - [`keyboardShortcuts`](#keyboardshortcuts)
  - [`hitComponent`](#hitcomponent)
  - [`setUserToken`](#setusertoken)
  - [`googleAnalytics`](#googleanalytics)
  - [`refinements`](#refinements)
  - [`sorts`](#sorts)
  - [`styles`](#styles)
- [Customizing the search UI](#customizing-the-search-ui)
  - [Refinements](#refinements-1)
  - [Sorting](#sorting)
- [Adjusting the styling](#adjusting-the-styling)
    - [`colors`](#colors)
    - [`text`](#text)
    - [`breakpoints`](#breakpoints)
- [Disclaimer](#disclaimer)

## Getting started

Follow the few steps described below to start using Unified InstantSearch E-Commerce.

1. **Push your data to Algolia** (following the [required data schema](#customizing-the-search-ui)),
2. [**Fork this GitHub repository**](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) to your own,
3. **Replace the values in `src/config/index.js`** to better match your needs,
4. **Run `npm run export` (or `yarn export`)** to build the JS and CSS files,
5. **Host and include the generated JS and CSS files** on your front-end and start using!

### Instructions

#### Prerequisites <!-- omit in toc -->

To run and build the project, you need:
- to create a [GitHub account](https://github.com/join/),
- and to install [Node.js 12.x](https://nodejs.org/en/).

We use [Yarn](https://yarnpkg.com/) and recommend you use it too to install and manage dependencies. If you prefer using [npm CLI](https://docs.npmjs.com/cli/npm) (built-in with Node.js), make sure to delete `yarn.lock` to avoid having conflicting lock files.

> Once you've picked either npm CLI or Yarn, **we recommend you stick to this choice**. Both tools generate different, incompatible lock files, which define what exact version of each dependency the project should use. Using both tools could break your final JavaScript file.

#### Forking and installing the project <!-- omit in toc -->

We provide Unified InstantSearch E-Commerce as a repository that you can [fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) and run on your own.

To do so, you need to navigate to the [original repository](https://github.com/algolia/ecomm-unified/) and click **Fork** at the top-right corner of the page. It creates a tracked copy of the repository on your GitHub account. Go to the fork and click the **Clone or download** to clone the project on your machine. We recommend you clone instead of downloading a ZIP archive so you can later easily [update the project](#updating-the-project).

Once you've cloned the fork on your machine, you can add the original upstream repository to facilitate updates.

```sh
git remote add upstream https://github.com/algolia/ecomm-unified.git
```

When you clone the project for the first time, or when you update it with the latest changes, you need to install dependencies. It must happen **before** using any of the provided commands.

```sh
yarn # or `npm install`
```

#### Running the project locally <!-- omit in toc -->

If you're customizing the project, you may want to test it out and see if it works before building it and adding it to your production website. We provide a fake e-commerce website in which you can run the project locally. It's useful to see your changes live while you're developing, and test them out before going to production.

```sh
yarn start # or `npm run start`
```

#### Previewing the project in production conditions <!-- omit in toc -->

When running the project locally (with the `start` command), you're in a development environment that comes with tooling to help you code and debug more quickly. It has an impact on performance, which doesn't give you a realistic idea of how fast and fluid the final experience is. For this reason, we provide a way for you to preview the project in the same way as with the `start` command, but in production conditions.

```sh
yarn preview # or `npm run preview`
npx serve --port 5000 preview
open http://localhost:5000/
```

#### Exporting the project <!-- omit in toc -->

Once you've customized the project and made sure it works properly, you need to export it into a JavaScript file that you then must include on your production website.

```sh
yarn export # or `npm run export`
```

Then, include the generated `search.js` and `search.css` files in your project.

#### Updating the project <!-- omit in toc -->

Whenever we change the project, you can [sync the latest changes in your fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork).

```sh
git fetch upstream
git checkout master
git merge upstream/master
```

> **You need to test any change to your project to make sure it still works correctly in every environment where you intend to serve it**. We're versioning the project using the [Semantic Versioning](https://semver.org/) convention, using tags for each release. Before syncing your fork, make sure whether the changes are breaking or not, and whether they are compatible with your changes.

### Commands

You have access to a handful of [command-line scripts](https://docs.npmjs.com/misc/scripts) to test your project during customization and build it once done.

You can run each command with npm or Yarn. For example, to run the `start` command, you can run either `npm run start` or `yarn start`.

| Command Name | Comments                                                                      |
| ------------ | ----------------------------------------------------------------------------- |
| `start`      | Run the project in development mode, within a fake e-commerce website.        |
| `preview`    | Build the project for previewing in the context of a fake e-commerce website. |
| `export`     | Export the production JavaScript file to include in your website.             |
| `lint`       | Look for linting issues (useful when customizing the project).                |
| `lint:js`    | Look for linting issues in the JavaScript code.                               |
| `lint:css`   | Look for linting issues in the CSS/Sass code.                                 |

## Configuration options

The `src/config/index.js` file describes the available options supported by Unified InstantSearch E-Commerce.

### `appId`

> `string` | required

Your Algolia Application ID ([find it on your Algolia account](https://www.algolia.com/api-keys)).

### `apiKey`

> `string` | required

Your Algolia Search-Only API key ([find it on your Algolia account](https://www.algolia.com/api-keys)).

### `index`

> `object` | required

Your Algolia index settings:

| Key | Type | Description |
| --- | --- | --- |
| `indexName` | `string` | Your Algolia index name. |
| `searchParameters` | [`SearchParameters`](https://www.algolia.com/doc/api-reference/search-api-parameters/) | The [search parameters](https://www.algolia.com/doc/api-reference/search-api-parameters/) to use. |

### `suggestionsIndex`

> `object`

Your Algolia [Query Suggestions](https://www.algolia.com/doc/guides/getting-insights-and-analytics/leveraging-analytics-data/query-suggestions/) index:

| Key | Type | Description |
| --- | --- | --- |
| `indexName` | `string` | Your Algolia index name. |
| `searchParameters` | [`SearchParameters`](https://www.algolia.com/doc/api-reference/search-api-parameters/) | The [search parameters](https://www.algolia.com/doc/api-reference/search-api-parameters/) to use. |

The Query Suggestions index is used to display suggestions below the search box and in the "no results" page.

Make sure you have access to Query Suggestions on your [Algolia plan](https://www.algolia.com/pricing/).

### `inputContainer`

> `string | HTMLElement` | required

The [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) or [HTML element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) that targets the DOM element to inject the search button into.

> This selector **must refer to a container** (e.g., `<div>`), not an `<input>`. Unified InstantSearch generates the `<input>` for you.

### `inputContent`

> `string | ReactNode` | required

The content to display in the search button.

### `keyboardShortcuts`

> `string[]`

The keyboard shortcuts to use to display the search overlay.

### `hitComponent`

> `(props: { hit: Hit, insights: Insights, view: "grid"|"list" }) => JSX.Element` | required

The hit component to display in the list of hits.

You have access to the following props:

| Prop | Type | Description |
| --- | --- | --- |
| `hit` | [`Hit`](https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/in-depth/understanding-the-api-response/#hits) | The hit returned by Algolia. |
| `insights` | [`Insights`](https://www.algolia.com/doc/api-client/methods/insights/?language=javascript) | The Insights function, already bound to the `index`, `userToken`, `queryID`, `objectIDs` and `positions` so that you only have to specify the `eventName`. |
| `view` | `"grid" \| "list"` | The current view mode. |

### `setUserToken`

> `(setToken: (userToken: string) => void) => void`

Function to set the [`userToken`](https://www.algolia.com/doc/api-reference/api-parameters/userToken/) to allow [Personalization](https://www.algolia.com/doc/guides/getting-insights-and-analytics/personalization/what-is-personalization/).

Make sure you have access to Personalization on your [Algolia plan](https://www.algolia.com/pricing/).

**Example:**

```js
const config = {
  // ...
  setUserToken(setToken) {
    // Assuming you store the `userToken` in a global variable
    setToken(window.ALGOLIA_USER_TOKEN);
    // Or if you store the `userToken` in an external API
    fetchTokenAsynchronously().then(({ token }) => setToken(token));
  },
};
```

### `googleAnalytics`

> `boolean`

Whether to send events to [Google Analytics](https://analytics.google.com/) when queries are triggered.

It assumes that the global Google Analytics object `ga` is available on `window`.

### `refinements`

See [Refinements](#refinements-1).

### `sorts`

See [Sorting](#sorting).

### `styles`

See [Customizing breakpoints](#customizing-breakpoints).

## Customizing the search UI

The configuration file lets you customize the search UI: what refinements to display, what sorting strategy to use, etc.

### Refinements

A refinement acts as a search filter on the search UI's left panel. The order of each refinement follows the declaration order in the configuration file.

Each refinement object contains the following properties:

| Key | Type | Description | Preview |
| --- | --- | --- | --- |
| `type` | `"list" \| "category" \| "hierarchical" \| "slider"` | The type of the refinement. | N/A |
| `header` | `string` | The content to display in the refinement panel header. | ![](.github/screenshots/refinement-header.png) |
| `label` | `string` | The label to display in the active refinements. | ![Label preview](.github/screenshots/refinement-label.png) |
| `options` | `object` | The refinement options forwarded to the InstantSearch widget | N/A |

> You need to add the attributes that you provide to the refinements' options as [attributes for faceting](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/how-to/declaring-attributes-for-faceting/), either on the [Algolia dashboard](https://www.algolia.com/explorer/display/) or using [`attributesForFaceting`](https://www.algolia.com/doc/api-reference/api-parameters/attributesForFaceting/) with the Algolia API.

**Example:**

```js
const config = {
  // ...
  refinements: [
    {
      {
      type: 'list',
      header: 'Brands',
      label: 'Brand',
      options: {
        attribute: 'brand',
      },
    },
  ]
}
```

#### Hierarchical <!-- omit in toc -->

| Preview |  |
| --- | --- |
| ![Hierarchical preview](.github/screenshots/refinement-hierarchical.png) | The hierarchical refinement creates a navigation based on a hierarchy of facet attributes. It is commonly used for categories with subcategories. |

##### Record schema <!-- omit in toc -->

The records to use in the hierarchical menu must follow this structure:

```json
[
  {
    "objectID": "321432",
    "name": "lemon",
    "categories.lvl0": "products",
    "categories.lvl1": "products > fruits"
  },
  {
    "objectID": "8976987",
    "name": "orange",
    "categories.lvl0": "products",
    "categories.lvl1": "products > fruits"
  }
]
```

You can also provide more than one path for each level:

```json
[
  {
    "objectID": "321432",
    "name": "lemon",
    "categories.lvl0": ["products", "goods"],
    "categories.lvl1": ["products > fruits", "goods > to eat"]
  }
]
```

##### Options <!-- omit in toc -->

| Key | Type | Description |
| --- | --- | --- |
| `type` | `"hierarchical"` | The type of the refinement. |
| `header` | `string` | The content to display in the refinement panel header. |
| `label` | `string` | The label to display in the active refinements. |
| `options` | `object` | The [options forwarded to the `HierarchicalMenu` InstantSearch widget](https://www.algolia.com/doc/api-reference/widgets/hierarchical-menu/react/#props). |

**Example:**

```js
const config = {
  // ...
  refinements: [
    {
      type: 'hierarchical',
      header: 'Categories',
      label: 'Category',
      options: {
        attributes: [
          'hierarchicalCategories.lvl0',
          'hierarchicalCategories.lvl1',
        ],
        limit: 6,
        showMore: true,
      },
    },
  ],
};
```

#### Category <!-- omit in toc -->

| Preview |  |
| --- | --- |
| ![Category preview](.github/screenshots/refinement-category.png) | The category refinement displays a menu that lets the user choose a single value for a specific attribute. |

##### Options <!-- omit in toc -->

| Key | Type | Description |
| --- | --- | --- |
| `type` | `"category"` | The type of the refinement. |
| `header` | `string` | The content to display in the refinement panel header. |
| `label` | `string` | The label to display in the active refinements. |
| `options` | `object` | The [options forwarded to the `Menu` InstantSearch widget](https://www.algolia.com/doc/api-reference/widgets/menu/react/#props). |

**Example:**

```js
const config = {
  // ...
  refinements: [
    {
      type: 'category',
      header: 'Categories',
      label: 'Category',
      options: {
        attribute: 'category',
        limit: 6,
        showMore: true,
      },
    },
  ],
};
```

#### List <!-- omit in toc -->

| Preview |  |
| --- | --- |
| ![List preview](.github/screenshots/refinement-list.png) | The list refinement displays a list that lets the user choose multiple values for a specific attribute. |

##### Options <!-- omit in toc -->

| Key | Type | Description |
| --- | --- | --- |
| `type` | `"list"` | The type of the refinement. |
| `header` | `string` | The content to display in the refinement panel header. |
| `label` | `string` | The label to display in the active refinements. |
| `options` | `object` | The [options forwarded to the `RefinementList` InstantSearch widget](https://www.algolia.com/doc/api-reference/widgets/refinement-list/react/#props). |

**Example:**

```js
const config = {
  // ...
  refinements: [
    {
      type: 'list',
      header: 'Brands',
      label: 'Brand',
      options: {
        attribute: 'brand',
        searchable: true,
        showMore: true,
        limit: 6,
      },
    },
  ],
};
```

#### Slider <!-- omit in toc -->

| Preview |  |
| --- | --- |
| ![Slider preview](.github/screenshots/refinement-slider.png) | The slider refinement provides a user-friendly way to filter the results based on a single numeric range. |

##### Record schema <!-- omit in toc -->

The values inside `attribute` **must be numbers, not strings**.

##### Options <!-- omit in toc -->

| Key | Type | Description |
| --- | --- | --- |
| `type` | `"slider"` | The type of the refinement. |
| `header` | `string` | The content to display in the refinement panel header. |
| `label` | `string` | The label to display in the active refinements. |
| `options` | `RefinementOptions` | The options of the refinement. |

##### RefinementOptions <!-- omit in toc -->

| Name | Type | Description |
| --- | --- | --- |
| `transformValue` | `(value: number) => ReactNode` | Function to transform the minimum and maximum displayed values. |

**Example:**

```js
const config = {
  // ...
  refinements: [
    {
      type: 'slider',
      header: 'Price',
      label: 'Price',
      options: {
        attribute: 'price',
        transformValue: (value) => (
          <>
            <span className="uni-Hit-Currency">$</span>
            {value}
          </>
        ),
      },
    },
  ],
};
```

### Sorting

The `sorts` configuration displays a list of indices, allowing a user to change the way hits are sorted (with [replica indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-your-indices/#replicating-an-index)).

You must define all indices that you pass as replicas of the main index.

| Key     | Type     | Description                         |
| ------- | -------- | ----------------------------------- |
| `label` | `string` | The label to display for the index. |
| `value` | `string` | The Algolia index name to target.   |

**Example:**

```js
const config = {
  // ...
  sorts: [
    {
      label: 'Featured',
      value: 'instant_search',
    },
    {
      label: 'Price ascending',
      value: 'instant_search_price_asc',
    },
    {
      label: 'Price descending',
      value: 'instant_search_price_desc',
    },
  ],
};
```

## Adjusting the styling

The `src/config/index.js` file also lets you adjust Unified InstantSearch E-Commerce to your branding and the style of your website. All available options are under the `styles` property.

> **NOTE:** if you change these values while in [development mode](#running-the-project-locally), you must restart the server to see your changes.

#### `colors`

> `object` | required

| Key | Type | Description |
| --- | --- | --- |
| `primary` | `string` | The accent color, typically the main color of your branding. |
| `secondary` | `string` | The secondary color, for most of the text content. |

> Internally, we use [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) with a static fallback for browsers that don't support it. If you want to leverage CSS custom properties (e.g., to implement multiple color themes), you can set the color variables as your initial values (and fallback for older browsers). Then, you can override them in the desired context by setting the corresponding CSS custom properties in your website's CSS.

#### `text`

> `object` | required

| Key | Type | Description |
| --- | --- | --- |
| `fontFamily` | `string` | The global font stack. |

> If you want to use the same font stack as your main website, we recommend you change the value to `inherit`.

#### `breakpoints`

> `object` | required

| Key | Type | Description |
| --- | --- | --- |
| `sm` | `number` | The breakpoint for small devices. |
| `md` | `number` | The breakpoint for medium devices. |
| `lg` | `number` | The breakpoint for large devices. |

> We've adapted the design of Unified InstantSearch to the default breakpoints. If you change them, make sure the layout still works the way you expect.

## Disclaimer

> Unified InstantSearch E-Commerce is made accessible to you for trial and experimentation purposes. You may decide to use it or not. You are aware that the use of Unified InstantSearch E-Commerce in production may increase your consumption of the Service, including [Queries Per Second](https://www.algolia.com/doc/faq/monitoring/which-queries-are-counted-as-part-of-the-max-qps-computations/).

> Algolia does not support Unified InstantSearch E-Commerce, and may discontinue it at any time at its sole discretion; configurations and customizations entered by you into Unified InstantSearch E-Commerce may be permanently lost. Any feedback (including source code) you may provide to us regarding Unified InstantSearch E-Commerce may be used by Algolia to improve the Service.

> Unified InstantSearch E-Commerce source code is provided "as is" and "as available" without any warranty of any kind. Algolia disclaims all obligation and liability for any harm or damage arising out of or in connection with Unified InstantSearch E-Commerce. For purposes of our [SLA](https://www.algolia.com/policies/sla), the Unified InstantSearch E-Commerce is not an "API Client".

import React from 'preact/compat';
import { connectPagination } from 'react-instantsearch-dom';

export const Pagination = connectPagination(function Pagination(props) {
  if (props.canRefine === false) {
    return null;
  }

  const pages = getPages(props.currentRefinement, props.nbPages, 2);

  function onPageClick(page) {
    props.refine(page);
    props.onClick();
  }

  return (
    <div className="ais-Pagination">
      <ul className="ais-Pagination-list">
        {props.currentRefinement !== 1 && (
          <li className="ais-Pagination-item ais-Pagination-item--previousPage">
            <a
              className="ais-Pagination-link"
              title="Previous page"
              href={props.createURL(props.currentRefinement - 1)}
              onClick={(event) => {
                event.preventDefault();
                onPageClick(props.currentRefinement - 1);
              }}
            >
              <svg width={10} height={10} viewBox="0 0 10 10">
                <g
                  fill="none"
                  fillRule="evenodd"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.143"
                >
                  <path d="M9 5H1M5 9L1 5l4-4" />
                </g>
              </svg>
            </a>
          </li>
        )}

        {pages.map((page) => (
          <li
            className={[
              'ais-Pagination-item',
              'ais-Pagination-item--page',
              props.currentRefinement === page &&
                'ais-Pagination-item--selected',
            ]
              .filter(Boolean)
              .join(' ')}
            key={page}
          >
            <a
              className="ais-Pagination-link"
              title={`Page ${page}`}
              href={props.createURL(page)}
              onClick={(event) => {
                event.preventDefault();
                onPageClick(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        {props.currentRefinement !== props.nbPages && (
          <li className="ais-Pagination-item ais-Pagination-item--nextPage">
            <a
              className="ais-Pagination-link"
              title="Next page"
              href={props.createURL(props.currentRefinement + 1)}
              onClick={(event) => {
                event.preventDefault();
                onPageClick(props.currentRefinement + 1);
              }}
            >
              <svg width={10} height={10} viewBox="0 0 10 10">
                <g
                  fill="none"
                  fillRule="evenodd"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.143"
                >
                  <path d="M1 5h8M5 9l4-4-4-4" />
                </g>
              </svg>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
});

function getPaddingLeft(currentPage, padding, maxPages, size) {
  if (currentPage <= padding) {
    return currentPage;
  }

  if (currentPage >= maxPages - padding) {
    return size - (maxPages - currentPage);
  }

  return padding + 1;
}

function getPages(currentPage, maxPages, padding) {
  const size = Math.min(2 * padding + 1, maxPages);

  if (size === maxPages) {
    return range({ start: 1, end: maxPages + 1 });
  }

  const paddingLeft = getPaddingLeft(currentPage, padding, maxPages, size);
  const paddingRight = size - paddingLeft;

  const first = currentPage - paddingLeft;
  const last = currentPage + paddingRight;

  return range({ start: first + 1, end: last + 1 });
}

function range({ start = 0, end, step = 1 }) {
  // We can't divide by 0 so we re-assign the step to 1 if it happens.
  const limitStep = step === 0 ? 1 : step;

  // In some cases the array to create has a decimal length.
  // We therefore need to round the value.
  // Example:
  //   { start: 1, end: 5000, step: 500 }
  //   => Array length = (5000 - 1) / 500 = 9.998
  const arrayLength = Math.round((end - start) / limitStep);

  return [...Array(arrayLength)].map(
    (_, current) => (start + current) * limitStep
  );
}

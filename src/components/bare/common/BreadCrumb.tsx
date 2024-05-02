import { Component } from "solid-js";

type BreadCrumbProps = {
  crumbs: {
    href: string;
    label: string;
  }[];
};

const BreadCrumb: Component<BreadCrumbProps> = (props) => {
  const { crumbs } = props;

  return (
    <ol class="flex items-center whitespace-nowrap">
      {crumbs.map((crumb, index) => (
        <li
          key={index}
          class={`inline-flex items-center ${
            index === crumbs.length - 1
              ? "text-sm font-semibold text-gray-800 truncate"
              : ""
          }`}
          aria-current={index === crumbs.length - 1 ? "page" : undefined}
        >
          <a
            class="flex items-center text-sm text-gray-500 hover:text-primary focus:outline-none focus:text-primary"
            href={crumb.href}
          >
            {crumb.label}
          </a>
          {index !== crumbs.length - 1 && (
            <svg
              class="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          )}
        </li>
      ))}
    </ol>
  );
};

export default BreadCrumb;

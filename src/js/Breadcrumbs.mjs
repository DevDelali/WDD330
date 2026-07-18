export function renderBreadcrumb(items, element = document.querySelector(".breadcrumbs")) {
  if (!element) return;

  element.innerHTML = items
    .map((item, index) => {
      const isLastItem = index === items.length - 1;
      if (isLastItem || !item.href) {
        return `<span${isLastItem ? ' aria-current="page"' : ""}>${item.label}</span>`;
      }
      return `<a href="${item.href}">${item.label}</a>`;
    })
    .join('<span class="breadcrumb-separator" aria-hidden="true">&rarr;</span>');
}

export const NavPagination = () => {
  const paginationSpan = document.createElement("span");
  paginationSpan.classList.add("navigation__pagination");
  paginationSpan.setAttribute("data-js", "pagination");

  return paginationSpan;
};

NavPagination();

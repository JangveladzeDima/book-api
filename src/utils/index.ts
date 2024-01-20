export interface Page {
  pageIndex?: number;
  pageSize?: number;
}

export type Search = Page;

export const DEFAULT_PAGE: Page = {
  pageIndex: 0,
  pageSize: 100,
};

export function getSearchOptions<T>(search?: Search) {
  return {
    ...getPage(search),
  };
}

export function getPage(
  page?: Page,
): { skip: number; take: number } | undefined {
  return (
    (page?.pageIndex >= 0 &&
      page?.pageSize > 0 && {
        skip:
          (page?.pageIndex || DEFAULT_PAGE.pageIndex) *
          (page?.pageSize || DEFAULT_PAGE.pageSize),
        take: page?.pageSize || DEFAULT_PAGE.pageSize,
      }) ||
    undefined
  );
}

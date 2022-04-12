export const pluckPageNumber = (url: string | null) => {
  const stringifiedPage = url?.match(/page=(\d+)/)?.[1];

  if (stringifiedPage) {
    return Number(stringifiedPage);
  }

  return null;
};

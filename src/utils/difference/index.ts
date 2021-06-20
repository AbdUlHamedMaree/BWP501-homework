export const difference = <T extends { toString: () => string }>(
  A: T[] | T,
  B: T[] | T,
) => {
  const arrA = Array.isArray(A) ? A.map(x => x.toString()) : [A.toString()];
  const arrB = Array.isArray(B) ? B.map(x => x.toString()) : [B.toString()];

  const result: string[] = [];
  for (const p of arrA) {
    if (arrB.indexOf(p) === -1) {
      result.push(p);
    }
  }

  return result;
};

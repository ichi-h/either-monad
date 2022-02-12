interface Which {
  readonly which: "left" | "right";
}

export interface Right<T> extends Which {
  readonly value: T;
  readonly which: "right";
}

export interface Left<T> extends Which {
  readonly value: T;
  readonly which: "left";
}

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L, R>(left: L): Either<L, R> => {
  return { value: left, which: "left" };
};

export const right = <L, R>(right: R): Either<L, R> => {
  return { value: right, which: "right" };
};

// either :: (a -> c) -> (b -> c) -> Either a b -> c
export const either =
  <L, R, T>(onLeft: (left: L) => T) =>
  (onRight: (right: R) => T) =>
  (either: Either<L, R>): T => {
    switch (either.which) {
      case "left":
        return onLeft(either.value);
      case "right":
        return onRight(either.value);
    }
  };

// fromLeft:: a -> Either a b -> a
export const fromLeft =
  <L, R>(left: L) =>
  (either: Either<L, R>): L => {
    if (either.which === "left") return either.value;
    return left;
  };

// fromRight:: b -> Either a b -> b
export const fromRight =
  <L, R>(right: R) =>
  (either: Either<L, R>): R => {
    if (either.which === "right") return either.value;
    return right;
  };

// isLeft:: Either a b -> Bool
export const isLeft = <L, R>(either: Either<L, R>): boolean => {
  return either.which === "left";
};

// isRight:: Either a b -> Bool
export const isRight = <L, R>(either: Either<L, R>): boolean => {
  return either.which === "right";
};

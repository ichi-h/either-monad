import { Either, left, right, either } from ".";

describe("Either Monad", () => {
  describe("1. return x >>= f == f x", () => {
    const f = (x: number) => x + 1;

    it("right", () => {
      const num = 10;
      const x: Either<number, number> = right(num);
      const g = (f: (x: number) => number) =>
        either<number, number, number>(() => 0)(f)(x);

      expect(g(f)).toBe(f(num));
    });

    it("left", () => {
      const num = 10;
      const x: Either<number, number> = left(num);
      const g = (f: (x: number) => number) =>
        either<number, number, number>(f)(() => 0)(x);

      expect(g(f)).toBe(f(num));
    });
  });

  describe("2. m >>= return == m", () => {
    it("right", () => {
      const expected = (() => {
        const result = right(10);
        return result;
      })();
      const actual = right(10);

      expect(expected).toStrictEqual(actual);
    });

    it("left", () => {
      const expected = (() => {
        const result = left(10);
        return result;
      })();
      const actual = left(10);

      expect(expected).toStrictEqual(actual);
    });
  });

  describe("3. (m >>= f) >>= g == m >>= (\\x -> f x >>= g)", () => {
    const g = (x: number) => x + 1;

    it("right", () => {
      const f = either<number, number, number>(() => 0)(left => left * 10);
      const x: Either<number, number> = right(10);

      const prog1 = () => f(x);

      const expected = (() => {
        const y = prog1();
        return g(y);
      })();

      const prog2 = (x: Either<number, number>) => {
        const y = f(x);
        return g(y);
      };

      const actual = (() => prog2(x))();

      expect(expected).toStrictEqual(actual);
    });

    it("left", () => {
      const f = either<number, number, number>(left => left * 10)(() => 0);
      const x: Either<number, number> = right(10);

      const prog1 = () => f(x);

      const expected = (() => {
        const y = prog1();
        return g(y);
      })();

      const prog2 = (x: Either<number, number>) => {
        const y = f(x);
        return g(y);
      };

      const actual = (() => prog2(x))();

      expect(expected).toStrictEqual(actual);
    });
  });
});

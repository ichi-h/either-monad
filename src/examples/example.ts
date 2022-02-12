import { Either, left, right, either } from "..";

const main = () => {
  const result = ((x: number): Either<string, number> => {
    if (x % 2 !== 0) return left("Error: Input value is odd.");
    return right(x);
  })(10);

  either<string, number, void>
    (left => console.log(left))
    (right => console.log(right))
    (result); // -> 10
};

main();

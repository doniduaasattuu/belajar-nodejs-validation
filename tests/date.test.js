import Joi from "joi";

describe("Joi", () => {
  it("should can validate date", () => {
    const birthDateSchema = Joi.date().required().max("now").min("1-1-1988");

    const result1 = birthDateSchema.validate("1-1-1987");
    console.info(result1);
    console.info(typeof result1.value);
    console.info(typeof result1.error);

    const result2 = birthDateSchema.validate("12-25-1990");
    console.info(result2);
    console.info(typeof result2.value);
    console.info(typeof result2.error);

    const result3 = birthDateSchema.validate("12-25-2027");
    console.info(result3);
    console.info(typeof result3.value);
    console.info(typeof result3.error);
  });
});

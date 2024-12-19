import Joi from "joi";

describe("Joi", () => {
  it("should can create schema", () => {
    const schema = Joi.string().min(3).max(100).required();

    const result = schema.validate("ek");

    if (result.error) {
      console.info(result.error);
    }
    {
      console.info(result);
    }
  });

  it("should can validate data type", () => {
    const usernameSchema = Joi.string().email().required();
    const isAdminSchema = Joi.boolean().required();
    const priceSchema = Joi.number().required().min(1000).max(1000000);

    const resultUsername = usernameSchema.validate("eko@gmail.com");
    console.info(resultUsername);

    const resultIsAdmin = isAdminSchema.validate("true");
    console.info(resultIsAdmin);
    console.info(typeof "true");
    console.info(typeof resultIsAdmin.value);
    console.info(typeof resultIsAdmin.error);

    const resultPrice = priceSchema.validate("1000");
    console.info(resultPrice);
  });
});

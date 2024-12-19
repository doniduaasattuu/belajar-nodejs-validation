import Joi, { string } from "joi";

describe("Joi", () => {
  it("should can validate object", () => {
    const loginSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email().required(),
      password: Joi.string().required().min(6).max(100).required(),
    });

    const request = {
      //   username: "eko@gmail.com",
      //   password: "rahasia",
      username: "eko",
      password: "eko",
    };

    const result = loginSchema.validate(request, {
      abortEarly: false,
    });

    console.info(result);
  });

  it("should can validate nested object", () => {
    const createUserSchema = Joi.object({
      id: Joi.string().required().max(100),
      name: Joi.string().required().max(100),
      address: Joi.object({
        street: Joi.string().required().max(200),
        city: Joi.string().required().max(100),
        country: Joi.string().required().max(100),
        zipCode: Joi.string().required().max(10),
      }).required(),
    });

    const request = {
      address: {},
    };

    const result = createUserSchema.validate(request, { abortEarly: false });
    console.info(result);

    if (result.error) {
      result.error.details.forEach((value) => {
        console.info(`${value.path} = ${value.message}`);
      });
    }
  });
});

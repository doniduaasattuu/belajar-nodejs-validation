import Joi from "joi";

describe("Joi", () => {
  it("should can custom message", () => {
    const schema = Joi.string().min(3).max(10).required().messages({
      "string.min": "{{#label}} panjang harus minimal {{#limit}} karakter",
    });

    const request = "aasasdasdasdas";

    const result = schema.validate(request);
    if (result.error) {
      console.info(result.error);
    }
  });

  it("should can use custom messages in object validation", () => {
    const schema = Joi.object({
      username: Joi.string().required().email().messages({
        "any.required": "{{#label}} harus di isi",
        "string.email": "{{#label}} harus valid email",
      }),
      password: Joi.string().required().min(6).max(10).messages({
        "any.required": "{{#label}} harus di isi",
        "string.min": "{{#label}} harus lebih dari {{#limit}} karakter",
        "string.max": "{{#label}} harus kurang dari {{#limit}} karakter",
      }),
    });

    const request = {
      username: "eko@pzn.com",
      password: "eko12345",
    };

    const result = schema.validate(request, {
      abortEarly: false,
    });
    console.info(JSON.stringify(result.value) == JSON.stringify(request));
  });
});

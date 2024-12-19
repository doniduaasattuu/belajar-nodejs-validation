import Joi from "joi";

describe("Joi", () => {
  it("should can custom validation", () => {
    const registerSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      password: Joi.string()
        .required()
        .min(6)
        .max(100)
        .custom((value, helpers) => {
          if (value.startsWith("eko")) {
            return helpers.error("password.wrong");
          }

          return value;
        })
        .messages({
          "password.wrong": "password can not start with eko",
        }),
      confirmPassword: Joi.string().required().min(6).max(100),
    })
      .custom((value, helpers) => {
        if (value.password != value.confirmPassword) {
          return helpers.error("register.password.different");
        }

        return value;
      })
      .messages({
        "register.password.different":
          "password and confirmpassword is not match",
      });

    const request = {
      username: "doni@gmail.com",
      password: "rahasia123",
      confirmPassword: "rahasia123",
    };

    const result = registerSchema.validate(request, { abortEarly: false });
    console.info(result);
  });
});

const Category = require("../controllers/category");

const Joi = require("joi");

const Router = {
  name: "category-router",
  version: "1.0.0",
  register: async (server, options) => {
    server.route({
      method: "GET",
      path: "/categories",
      options: {
        description: "Get list of categories",
        tags: ["api", "mobile-shopping"]
      },
      handler: Category.list
    });

    server.route({
      method: "POST",
      path: "/categories",
      options: {
        validate: {
          payload: {
            code: Joi.string().required(),
            description: Joi.string().optional()
          },
          failAction: (request, h, error) => {
            return error.isJoi
              ? h.response(error.details[0]).takeover()
              : h.response(error).takeover();
          }
        },
        description: "Create new category",
        tags: ["api", "mobile-shopping"]
      },
      handler: Category.create
    });

    server.route({
      method: "GET",
      path: "/categories/{id}",
      options: {
        description: "Get category detail by id",
        tags: ["api", "mobile-shopping"]
      },
      handler: Category.detail
    });

    server.route({
      method: "PUT",
      path: "/categories/{id}",
      options: {
        validate: {
          payload: {
            code: Joi.string().optional(),
            description: Joi.string().optional()
          },
          failAction: (request, h, error) => {
            return error.isJoi
              ? h.response(error.details[0]).takeover()
              : h.response(error).takeover();
          }
        },
        description: "Update category",
        tags: ["api", "mobile-shopping"]
      },
      handler: Category.update
    });

    server.route({
      method: "DELETE",
      path: "/categories/{id}",
      options: {
        description: "Delete category",
        tags: ["api", "mobile-shopping"]
      },
      handler: Category.delete
    });
  }
};

module.exports = Router;

const { init } = require("../server");
const Category = require("../models/category");
const Mongoose = require("mongoose");

Mongoose.connect("mongodb://localhost/mobile-shopping-test", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log("MongoDB connected..."))
  .catch((error) => console.log(error));

let url = "/categories";
let testName = "Category";

jest.setTimeout(30000);

describe(`${testName} Endpoints`, () => {
  let server;
  beforeAll(async () => {
    server = await init();
  });

  beforeEach(async () => {
    await server.initialize();
    await Category.remove({});
  });

  afterEach(async () => {
    await server.stop();
  });

  afterAll(async () => {
    await Mongoose.connection.db.dropDatabase();
    await Mongoose.disconnect();
  });

  describe(`GET ${url}`, () => {
    it(`Should get all categories`, async () => {
      const injectOptions = {
        method: "GET",
        url
      };
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
      const payload = JSON.parse(response.payload);
      expect(payload).toEqual([]);
    });
  });

  describe(`POST ${url}`, () => {
    it(`Create category with payload value`, async () => {
      const injectOptions = {
        method: "POST",
        url,
        payload: {
          code: "Phone",
          description: "Phone"
        }
      };
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
      const payload = JSON.parse(response.payload);
      expect(payload.code).toEqual(injectOptions.payload.code);
    });

    it(`Should not create category without code field`, async () => {
      const injectOptions = {
        method: "POST",
        url,
        payload: {
          description: "Phone"
        }
      };
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty("message");
      expect(payload).toHaveProperty("path");
    });
  });

  describe(`GET ${url}/{id}`, () => {
    it(`Should get detail of category`, async () => {
      let category = await Category.create({
        code: "Phone",
        description: "Phone"
      });
      const injectOptions = {
        method: "GET",
        url: `${url}/${category._id}`
      };
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty("code");
      expect(payload.code).toEqual(category.code);
    });

    it(`Should not get detail of category with wrong id`, async () => {
      let category = await Category.create({
        code: "Phone",
        description: "Phone"
      });
      let id = "5cee36cc5358844e0c67fed5";
      const injectOptions = {
        method: "GET",
        url: `${url}/${id}`
      };
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(404);
      const payload = JSON.parse(response.payload);
      expect(payload).toEqual({});
    });
  });

  describe(`PUT ${url}/{id}`, () => {
    describe(`Should update category with provided id`, () => {
      it(`Should have status code equal 200`, async () => {
        let category = await Category.create({
          code: "Phone",
          description: "Phone"
        });
        const injectOptions = {
          method: "PUT",
          url: `${url}/${category._id}`,
          payload: {
            description: "SmartPhone"
          }
        };
        const response = await server.inject(injectOptions);
        expect(response.statusCode).toEqual(200);
      });
      it(`Should have property code in body`, async () => {
        let category = await Category.create({
          code: "Phone",
          description: "Phone"
        });
        const injectOptions = {
          method: "PUT",
          url: `${url}/${category._id}`,
          payload: {
            description: "SmartPhone"
          }
        };
        const response = await server.inject(injectOptions);
        const payload = JSON.parse(response.payload);
        expect(payload).toHaveProperty("code");
      });
      it(`Should have property description in body`, async () => {
        let category = await Category.create({
          code: "Phone",
          description: "Phone"
        });
        const injectOptions = {
          method: "PUT",
          url: `${url}/${category._id}`,
          payload: {
            description: "SmartPhone"
          }
        };
        const response = await server.inject(injectOptions);
        const payload = JSON.parse(response.payload);
        expect(payload).toHaveProperty("description");
      });
      it(`Should have description equal to SmartPhone`, async () => {
        let category = await Category.create({
          code: "Phone",
          description: "Phone"
        });
        const injectOptions = {
          method: "PUT",
          url: `${url}/${category._id}`,
          payload: {
            description: "SmartPhone"
          }
        };
        const response = await server.inject(injectOptions);
        const payload = JSON.parse(response.payload);
        expect(payload.description).toEqual(injectOptions.payload.description);
      });
    });
  });

  describe(`DELETE ${url}/{id}`, () => {
    it(`Should have status code equal 200`, async () => {
      let category = await Category.create({
        code: "Phone",
        description: "Phone"
      });
      const injectOptions = {
        method: "DELETE",
        url: `${url}/${category._id}`
      };
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toEqual(200);
    });

    it(`Should delete category with provided id`, async () => {
      let category = await Category.create({
        code: "Phone",
        description: "Phone"
      });
      const injectOptions = {
        method: "DELETE",
        url: `${url}/${category._id}`
      };
      const response = await server.inject(injectOptions);
      const payload = JSON.parse(response.payload);
      expect(payload).toHaveProperty("message");
    });
  });
});

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Express News API",
      version: "1.0.0",
      description: "API for Express News",
      licence: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Sichko Oleh",
        url: "https://github.com/1olelllka",
        email: "olehit32@gmail.com",
      },
    },
    servers: [
      {
        url: "localhost:8000/api/v1/",
      },
    ],
  },
  apis: [
    "./src/routes/*.js",
    "./src/routes/user/*.js",
    "./src/routes/auth/*.js",
  ],
};

module.exports = options;

const router = new (require("restify-router")).Router();
const common = require("../../../service/common");

//Load Services
const userService = require("../../../service/user");

common.api.public.post(router, "/register", async function(req) {
  const newUser = await userService.registerUser(req.body);
  return newUser;
});

common.api.public.post(router, "/login", async function(req) {
  const token = await userService.loginUser(req.body);
  return "Bearer " + token;
});

common.api.private.get(router, "/current", req => {
  return {
    name: req.user.name,
    email: req.user.email
  };
});

module.exports = router;

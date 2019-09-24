const express = require('express');
const router = express.Router();
const { inject } = require('../core');
const { entities } = require('../constants');

router.post('/create-user', async (req, res, next) => {
    const userEntity = inject({ entity: entities.USER });
    const userService = inject({ service: entities.USER });
    const userRepository = inject({ reposytory: entities.USER });

    userService.getUserDataFromRequest(req, userEntity);
    await userRepository.create(userEntity);
    res.json(userEntity);
    console.log(userEntity);
});

module.exports = router;

'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    create: async (ctx) => {
        const user = ctx.state.user;
        const friendId = ctx.request.body.for;

        const result = await strapi.services.friends.create({user: user.id, for: friendId})

        ctx.send(result)
    },

    delete: async (ctx) => {
        const user = ctx.state.user;
        const friendId = ctx.params.id;

        const result = await strapi.services.friends.delete({user: user.id, for: friendId})

        ctx.send(result)
    }
};

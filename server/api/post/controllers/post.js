'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    
    likeOrDislike: async (ctx) => {
        const postId = ctx.params.id;
        const user = ctx.state.user;
        
        let likeExists = (await strapi.services["post-like"].find({post: postId, user: user.id})).length > 0;
        let result = {like: false, dislike: false}

        if( likeExists ) {
            strapi.services["post-like"].delete({post: postId, user: user.id}, [""]);
            result.dislike = true;
        }
        else {
            strapi.services['post-like'].create({post: postId, user: user.id}, [""]);
            result.like = true;
        }

        ctx.send(result);
    },

    countLikes: async (ctx) => {
        const postId = ctx.params.id;

        const numLikes = await strapi.services["post-like"].count({post: postId})

        ctx.send(numLikes)
    },

    find: async (ctx) => {
        const posts = await strapi.services.post.find({_sort: "updated_at:desc"})
        ctx.send(posts)
    }
};

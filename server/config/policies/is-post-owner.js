'use strict';

/**
 * `isPostOwner` policy.
 */

module.exports = async (ctx, next) => {
  if (ctx.state.user) {
    const userId = ctx.state.user.id
    const postId = ctx.params.id;
    const post = (await strapi.services.post.find({id: postId}, ["id"]))[0]

    if(post && post.author === userId){
      return await next();
    }
    else ctx.unauthorized("You are not authorized to change this resource")
    
  }

  else ctx.unauthorized(`You're not logged in!`);
};

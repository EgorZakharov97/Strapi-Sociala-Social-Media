'use strict';

/**
 * `add-post-owner` policy.
 */

module.exports = async (ctx, next) => {
  
  const user = ctx.state.user;

  const body = (await JSON.parse(ctx.request.body.data));

  body.author = user.id

  ctx.request.body.data = JSON.stringify(body)

  return await next()
};

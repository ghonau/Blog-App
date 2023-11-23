const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')
module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER)
    return {
      env: {
        mongodb_username: 'mongo_user',
        mongodb_password: 'MongoDBAdmin',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'blog-dev',
      },
    }
  return {
    env: {
      mongodb_username: 'mongo_user',
      mongodb_password: 'MongoDBAdmin',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'blog',
    },
  }
}

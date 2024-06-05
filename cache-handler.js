const cache = new Map()
 
module.exports = class CacheHandler {
  constructor(options) {
    this.options = options
  }
 
  async get(key) {
    // This could be stored anywhere, like durable storage
    const data =  cache.get(key)
    if(data?.value?.kind === 'PAGE' && data?.value?.status === 404 &&  data?.lastModified){
      let currentTime = Date.now();
      let cacheTime = parseInt(data.lastModified);
      let deltaTime = Math.round((currentTime - cacheTime) / 1000);
      if (deltaTime > parseInt(data.revalidate || 0)) {
        cache.delete(key);
        return null
      }
    }

    return data
  }
 
  async set(key, data, ctx) {
    // This could be stored anywhere, like durable storage
    cache.set(key, {
      value: data,
      lastModified: Date.now(),
      tags: ctx.tags,
      ravalidate: ctx.revalidate,
    })
  }
 
  async revalidateTag(tag) {
    // Iterate over all entries in the cache
    for (let [key, value] of cache) {
      // If the value's tags include the specified tag, delete this entry
      if (value.tags.includes(tag)) {
        cache.delete(key)
      }
    }
  }
}
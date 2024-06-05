This repository is dedicated to reproduce error for following issue on nextjs: https://github.com/vercel/next.js/issues/66540
## Bug summary

When a 404 page is cached the status of page never change even if page component doesn't return notFound() anymore.

## To Reproduce

1. `npm install`
2. `npm run demo`
3.  Go to: http://localhost:3000/hello-2
4. edit demo/articles.json and modifiy slug from hello to hello-2
5. Refresh http://localhost:3000/hello-2 until “Hello world” appears
6. Chek network tab and http://localhost:3000/hello-2 still with a 404 status

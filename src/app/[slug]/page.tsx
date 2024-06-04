import { notFound } from "next/navigation";
import { FC } from "react";

export const revalidate = 5;
export const dynamic = 'force-static';

const Page: FC<{ params: {slug: string}}>  = async ({
    params: { slug },
  }) => {
    const response = await fetch(`http://localhost:1234/articles.json`);
    const articles = await response.json();
    const article = articles.find((article: { slug: string, title: string}) => article.slug === slug);
    if(!article){
        return notFound()
    }
    return <div>{article.title}</div>
  }
export default Page
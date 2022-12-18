import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import { useEffect, useState } from "react";
import defaultOG from "../public/img/opengraph.jpg";
import { postquery, configQuery } from "@lib/groq";
import GetImage from "@utils/getImage";
import PostList from "@components/postlist";

export default function Post(props) {
  const { postdata, siteconfig, preview } = props;
  
  const [newPosts, setNewPosts] = useState();
  useEffect(() => {
    axios.get("https://promo.productlab.pro/api/article")
      .then(function(response) {
        setNewPosts(response.data.result);
      });
  }, []);
  
  const postsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
    gap: '2.5rem'
  };
  
  const router = useRouter();
  //console.log(router.query.category);
  
  const { data: posts } = usePreviewSubscription(postquery, {
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });
  
  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });
  //console.log(posts);
  const ogimage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;
  return (
    <>
      {newPosts && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`${siteConfig?.title}`}
            description={siteConfig?.description || ""}
            canonical={siteConfig?.url}
            openGraph={{
              url: siteConfig?.url,
              title: `${siteConfig?.title}`,
              description: siteConfig?.description || "",
              images: [
                {
                  url: "",
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: "Web3Forms"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />
          <Container>
            {/*className="grid gap-10 lg:gap-10 md:grid-cols-2 "*/}
            <div className={'md:flex'} style={{gap: "2.5rem"}}>
              {newPosts.slice(0, 2).map(post => (
                <PostList
                  key={post.id}
                  post={post}
                  aspect="landscape"
                />
              ))}
            </div>
            {/*<div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">*/}
            <div className="mt-10" style={postsStyle}>
              {newPosts.slice(2).map(post => (
                <PostList
                  key={post.id}
                  post={post}
                  aspect="square"
                />
              ))}
            </div>
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(postquery);
  const config = await getClient(preview).fetch(configQuery);
  
  // const categories = (await client.fetch(catquery)) || null;
  
  return {
    props: {
      postdata: post,
      // categories: categories,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}

import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import client, {
  getClient,
  usePreviewSubscription,
  PortableText
} from "@lib/sanity";
import ErrorPage from "next/error";
import GetImage from "@utils/getImage";
import { parseISO, format } from "date-fns";
import { NextSeo } from "next-seo";
import { singlequery, configQuery, pathquery } from "@lib/groq";
import CategoryLabel from "@components/blog/category";
import AuthorCard from "@components/blog/authorCard";
import { useEffect, useState } from "react";

export default function Article(props) {
  const { postdata, siteconfig, preview } = props;
  
  const router = useRouter();
  const baseUrl = 'https://promo.productlab.pro/api/';
  
  const [currentPost, setCurrentPost] = useState();
  
  
  useEffect(() => {
    axios.get(`https://promo.productlab.pro/api${router.asPath}`)
      .then(function(response) {
        setCurrentPost(response.data);
      })
  }, []);
  
  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });
  
  // if (!router.isFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />;
  // }
  
  return (
    <>
      {currentPost && (
        <Layout {...siteConfig}>
          {/*<NextSeo*/}
          {/*  title={`${currentPost.title} - ${currentPost.title}`}*/}
          {/*  description={currentPost.first_sentence || ""}*/}
          {/*  canonical={`he.com`}*/}
          {/*  openGraph={{*/}
          {/*    url: `he.com`,*/}
          {/*    title: `${currentPost.title} - ${siteConfig.title}`,*/}
          {/*    description: currentPost.first_sentence || "",*/}
          {/*    images: [*/}
          {/*      {*/}
          {/*        url: GetImage(currentPost?.main_pic) || "",*/}
          {/*        width: 800,*/}
          {/*        height: 600,*/}
          {/*        alt: ""*/}
          {/*      }*/}
          {/*    ],*/}
          {/*    site_name: siteConfig.title*/}
          {/*  }}*/}
          {/*  twitter={{*/}
          {/*    cardType: "summary_large_image"*/}
          {/*  }}*/}
          {/*/>*/}
          
          {/*
          <div className="relative bg-white/20">
            <div className="absolute w-full h-full -z-10">
              {article?.mainImage && (
                <Image
                  {...GetImage(article.mainImage)}
                  alt={article.mainImage?.alt || "Thumbnail"}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
            <Container className="py-48">
              <h1 className="relative max-w-3xl mx-auto mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl after:absolute after:w-full after:h-full after:bg-white after:inset-0 after:-z-10 after:blur-2xl after:scale-150">
                {article.title}
              </h1>
            </Container>
          </div> */}
          
          <Container className="!pt-0">
            <div className="max-w-screen-md mx-auto ">
              <div className="text-center">
                <CategoryLabel categories={currentPost.categories} />
              </div>
              
              <h1
                className="article__title tracking-tight lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
                {currentPost.title}
              </h1>
              
              <div className="flex justify-center mt-3 space-x-3 text-gray-500 ">
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0 author-img">
                    {currentPost?.owner?.profile_pic && (
                      <Image
                        src={`${baseUrl}${currentPost.owner.profile_pic}`}
                        blurDataURL={`${baseUrl}${currentPost.header_pic}`}
                        // loader={AuthorimageProps.loader}
                        objectFit="cover"
                        alt={currentPost?.owner?.name}
                        placeholder="blur"
                        layout="fill"
                        className="rounded-full"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-400">
                      {currentPost.owner.name}
                    </p>
                    <div className="flex items-center space-x-2 text-sm">
                      <time
                        className="text-gray-500 dark:text-gray-400"
                        dateTime={
                          currentPost?.time_created || post._createdAt
                        }>
                        {format(
                          parseISO(
                            currentPost?.time_created || post._createdAt
                          ),
                          "MMMM dd, yyyy"
                        )}
                      </time>
                      <span>
                        · {currentPost.estReadingTime || "5"} min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          
          <div className="relative z-0 max-w-screen-lg mx-auto overflow-hidden lg:rounded-lg aspect-video">
            {currentPost.main_pic && (
              <Image
                src={`${baseUrl}${currentPost.main_pic}`}
                // loader={rings}
                blurDataURL={`${baseUrl}${currentPost.header_pic}`}
                alt={currentPost?.title || "Thumbnail"}
                layout="fill"
                loading="eager"
                objectFit="cover"
              />
            )}
          </div>
          
          {/* {article?.mainImage && <MainImage image={article.mainImage} />} */}
          
          
          <Container>
            <article className="max-w-screen-md mx-auto ">
              <div className="mx-auto my-3 prose prose-base dark:prose-invert prose-a:text-blue-500">
                {/*{currentPost.first_sentence && <PortableText value={currentPost.first_sentence} />}*/}
                {currentPost.first_sentence}
              </div>
              <div className="allPostsBtn mt-7 mb-7">
                <Link href="/">
                  <a className="px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 ">
                    ← View all posts
                  </a>
                </Link>
              </div>
              {currentPost.owner.name && <AuthorCard author={currentPost.owner} />}
            </article>
          </Container>
        </Layout>
      )}
    </>
  );
}

const MainImage = ({ image }) => {
  return (
    <div className="mt-12 mb-12 ">
      <Image {...GetImage(image)} alt={image.alt || "Thumbnail"} />
      <figcaption className="text-center ">
        {image.caption && (
          <span className="text-sm italic text-gray-600 dark:text-gray-400">
            {image.caption}
          </span>
        )}
      </figcaption>
    </div>
  );
};

export async function getStaticProps({ params, preview = false }) {
  //console.log(params);
  const post = await getClient(preview).fetch(singlequery, {
    slug: params.slug
  });
  
  const config = await getClient(preview).fetch(configQuery);
  
  return {
    props: {
      postdata: { ...post },
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const allPosts = await client.fetch(pathquery);
  return {
    paths:
      allPosts?.map(page => ({
        params: {
          slug: page.slug
        }
      })) || [],
    fallback: true
  };
}

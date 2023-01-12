import Container from "@components/container";
import Layout from "@components/layout";
import PostList from "@components/postlist";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export const getServerSideProps = async context => {
  const response = await axios.get(
    "https://promo.productlab.pro/api/article?limit=14"
  );

  if (!response.data.result) {
    return {
      notFound: true
    };
  }

  return {
    props: { articles: response.data.result }
  };
};

export default function Post(props) {
  // const { postdata, siteconfig, preview } = props;

  // const [newPosts, setNewPosts] = useState();
  // useEffect(() => {
  //   axios
  //     .get("https://promo.productlab.pro/api/article")
  //     .then(function (response) {
  //       setNewPosts(response.data.result);
  //     });
  // }, []);

  // const { data: siteConfig } = usePreviewSubscription(configQuery, {
  //   initialData: siteconfig,
  //   enabled: preview || router.query.preview !== undefined
  // });

  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const [articles, setArticles] = useState(props.articles);
  console.log(articles);

  const getMoreArticles = async () => {
    const response = await axios.get(
      `https://promo.productlab.pro/api/article?limit=14&offset=${articles.length}`
    );

    if (response.data.result.length == 0) {
      setHasMore(false);
    }
    setArticles(article => [...article, ...response.data.result]);
  };

  return (
    <>
      {articles && (
        <Layout>
          {/*<NextSeo*/}
          {/*  title={`${siteConfig?.title}`}*/}
          {/*  description={siteConfig?.description || ""}*/}
          {/*  canonical={siteConfig?.url}*/}
          {/*  openGraph={{*/}
          {/*    url: siteConfig?.url,*/}
          {/*    title: `${siteConfig?.title}`,*/}
          {/*    description: siteConfig?.description || "",*/}
          {/*    images: [*/}
          {/*      {*/}
          {/*        url: "",*/}
          {/*        width: 800,*/}
          {/*        height: 600,*/}
          {/*        alt: ""*/}
          {/*      }*/}
          {/*    ],*/}
          {/*    site_name: "Web3Forms"*/}
          {/*  }}*/}
          {/*  twitter={{*/}
          {/*    cardType: "summary_large_image"*/}
          {/*  }}*/}
          {/*/>*/}

          <Container>
            <InfiniteScroll
              dataLength={articles.length}
              next={getMoreArticles}
              hasMore={hasMore}
              loader={<h3> Loading...</h3>}
              style={{ overflow: "unset" }}>
              <div className="grid gap-10 lg:gap-10 md:grid-cols-2">
                {articles.slice(0, 2).map(post => (
                  <PostList
                    key={post.id}
                    post={post}
                    aspect="landscape"
                  />
                ))}
              </div>
              <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
                {articles.slice(2).map(post => (
                  <PostList
                    key={post.id}
                    post={post}
                    aspect="square"
                  />
                ))}
              </div>
            </InfiniteScroll>
          </Container>
        </Layout>
      )}
    </>
  );
}

// export async function getStaticProps({ params, preview = false }) {
//   const post = await getClient(preview).fetch(postquery);
//   const config = await getClient(preview).fetch(configQuery);
//
//   // const categories = (await client.fetch(catquery)) || null;
//
//   return {
//     props: {
//       postdata: post,
//       // categories: categories,
//       siteconfig: { ...config },
//       preview
//     },
//     revalidate: 10
//   };
// }

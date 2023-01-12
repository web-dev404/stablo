import Container from "@components/container";
import Layout from "@components/layout";
import PostList from "@components/postlist";
import axios from "axios";
import { useRouter } from "next/router";

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

export default function Post({ articles }) {
  // const { postdata, siteconfig, preview } = props;

  // const [newPosts, setNewPosts] = useState();
  // useEffect(() => {
  //   axios
  //     .get("https://promo.productlab.pro/api/article")
  //     .then(function (response) {
  //       setNewPosts(response.data.result);
  //     });
  // }, []);

  const router = useRouter();

  // const { data: siteConfig } = usePreviewSubscription(configQuery, {
  //   initialData: siteconfig,
  //   enabled: preview || router.query.preview !== undefined
  // });
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
              {articles.slice(2, 15).map(post => (
                <PostList key={post.id} post={post} aspect="square" />
              ))}
            </div>
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

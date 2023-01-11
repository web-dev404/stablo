import Container from "@components/container";
import Layout from "@components/layout";
import PostList from "@components/postlist";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Author = () => {
  const router = useRouter();
  const baseUrl = "https://promo.productlab.pro/api/article?performers_ids=";
  const id = router.query.slug;
  const [authorPosts, setAuthorPosts] = useState();
  
  useEffect(() => {
    if (!id) {
      return;
    }
    
    const updateGames = async () => {
      axios
        .get(`${baseUrl}${id}`)
        .then(function(response) {
          setAuthorPosts(response.data.result);
        });
    };
    
    updateGames();
  }, [id]);
  
  useEffect(() => {
    console.log(authorPosts);
  }, authorPosts);
  
  return (
    <Layout>
      <Container className="!pt-0">
        {authorPosts && (
          <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
            {authorPosts.map(post => (
              <PostList key={post.id} post={post} aspect="square" />
            ))}
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default Author;

import Container from "@components/container";
import Layout from "@components/layout";
import { authorsquery, configQuery } from "@lib/groq";
import GetImage from "@utils/getImage";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function About({ authors, siteconfig }) {
  const baseUrl = 'https://promo.productlab.pro/api/';
  
  const [users, setUsers] = useState();
  
  useEffect(() => {
   const getUsers = async () => {
     const response = await fetch("https://promo.productlab.pro/api/users", {
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Token: "4afbd2691c6d71271635b31d18af22e8"
       },
       method: "GET"
     })
  
     setUsers(await response.json());
   }
   
    getUsers();
  }, []);
  
  return (
    <Layout {...siteconfig}>
      <Container>
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          About
        </h1>
        <div className="text-center">
          <p className="text-lg">We are a small passionate team.</p>
        </div>
  
        {users && (
          <div className="users-wrapper">
            {users.result.slice(0, 3).map(user => (
              <div
                key={user.id}
                className="relative overflow-hidden rounded-md aspect-square odd:translate-y-10 odd:md:translate-y-16">
                <Image
                  src={`${baseUrl}${user.profile_pic}`}
                  alt={user.name || " "}
                  layout="fill"
                  objectFit="cover"
                  sizes="(max-width: 320px) 100vw, 320px"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mx-auto prose text-center dark:prose-invert mt-14">
          <p>
            We provide real-time connectivity to enable software
            providers and financial institutions to build integrated
            products for their small business customers.
          </p>
          <p>
            Our API infrastructure is leveraged by clients ranging
            from lenders to corporate card providers and business
            forecasting tools, with use cases including automatic
            reconciliation, business dashboarding, and loan
            decisioning.
          </p>
          <p>
            <Link href="/contact">Get in touch</Link>
          </p>
        </div>
      </Container>
    </Layout>
  );
}

// export async function getStaticProps({ params, preview = false }) {
//   //console.log(params);
//   const authors = await getClient(preview).fetch(authorsquery);
//   const config = await getClient(preview).fetch(configQuery);
//   return {
//     props: {
//       authors: authors,
//       siteconfig: { ...config },
//       preview
//     },
//     revalidate: 100
//   };
// }

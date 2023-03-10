import CategoryLabel from "@components/blog/category";
import { PhotographIcon } from "@heroicons/react/outline";
import { cx } from "@utils/all";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function PostList({ post, aspect }) {
  const baseUrl = "https://promo.productlab.pro/api/";

  useEffect(() => {
    if (post.categories) {
      console.log(post.categories);
    }
  }, [post.categories]);

  return (
    <>
      <div className="cursor-pointer link-effect basis-1/2 max-w-full overflow-hidden">
        <div
          className={cx(
            "relative overflow-hidden transition-all bg-gray-100 rounded-md dark:bg-gray-800   hover:scale-105",
            aspect === "landscape" ? "aspect-video" : "aspect-square"
          )}>
          <Link href={`/article/${post.id}`}>
            {post.main_pic ? (
              <Image
                src={`${baseUrl}${post.main_pic}`}
                // loader={rings}
                blurDataURL={`${baseUrl}${post.header_pic}`}
                alt={post.first_sentence || "Thumbnail"}
                placeholder="blur"
                layout="fill"
                objectFit="cover"
                className="transition-all"
              />
            ) : (
              <span className="absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <PhotographIcon />
              </span>
            )}
          </Link>
        </div>
        {post.category[0] && (
          <CategoryLabel category={post.category} />
        )}
        <h2 className="mt-2 text-lg font-semibold tracking-normal text-brand-primary dark:text-white">
          <Link href={`/article/${post.id}`}>
            <span className="link-underline link-underline-blue">
              {post.title}
            </span>
          </Link>
        </h2>

        <div className="hidden">
          {post.excerpt && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
              <Link href={`/article/${post.id}`}>{post.excerpt}</Link>
            </p>
          )}
        </div>

        <Link href={`/author/${post.owner.id}`}>
          <div className="flex items-center mt-3 space-x-3 text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0 w-5 h-5">
                {post.owner.profile_pic && (
                  <Image
                    src={`${baseUrl}${post.owner.profile_pic}`}
                    blurDataURL={`${baseUrl}${post.owner.profile_pic}`}
                    // loader={rings}
                    objectFit="cover"
                    layout="fill"
                    alt={post?.owner?.name}
                    placeholder="blur"
                    className="rounded-full"
                  />
                )}
              </div>
              <span className="text-sm">{post.owner.name}</span>
            </div>
            <span className="text-xs text-gray-300 dark:text-gray-600">
              &bull;
            </span>
            <time
              className="text-sm"
              dateTime={post?.time_created || post._createdAt}>
              {format(
                parseISO(post?.time_created || post._createdAt),
                "MMMM dd, yyyy"
              )}
            </time>
          </div>
        </Link>
      </div>
    </>
  );
}

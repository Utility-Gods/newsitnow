import { useNavigate } from "@solidjs/router";
import { Show } from "solid-js";
import { Component, createResource } from "solid-js";
import PageSkeleton from "~/components/bare/common/PageSkeleton";

const fetch_articles = async (id: string) => {
  try {
    const res = await fetch("http://localhost:1337/api/articles/" + id, {});
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
};

const Article: Component = (props) => {
  const articleId = () => props.params.id;

  console.log(articleId(), props);
  const [article, { refetch }] = createResource(articleId(), fetch_articles);
  return (
    <div>
      <Show when={!article.loading} fallback={<PageSkeleton></PageSkeleton>}>
        <Show when={article()}>
          <div>
            <div>{article().name}</div>
            <div data-remove-styles innerHTML={article().text}></div>
          </div>
        </Show>
      </Show>
    </div>
  );
};

export default Article;

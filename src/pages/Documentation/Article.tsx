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
    <Show when={!article.loading} fallback={<PageSkeleton></PageSkeleton>}>
      <Show when={article()}>
        <div class="ql-editor">
          <div>{article().name}</div>
          <div innerHTML={article().text}></div>
        </div>
      </Show>
    </Show>
  );
};

export default Article;

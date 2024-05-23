import { fetch_articles } from "@lib/service/article";
import { get_first_org_id } from "@lib/utils";
import { useNavigate, useParams } from "@solidjs/router";

import { Component, createResource } from "solid-js";
import ArticleList from "~/components/functional/article/ArticleList";
import { Button } from "~/components/ui/button";

const Article: Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const org_id = () => params.org_id ?? get_first_org_id();

  const [articleList, { refetch }] = createResource(org_id, fetch_articles);

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <div class="flex justify-between items-center p-3 ">
        <div class="text-2xl font-bold text-primary leading-10">Articles</div>
        <Button
          class="font-bold text-base"
          size="lg"
          onClick={() => navigate("create")}
        >
          Create Article
        </Button>
      </div>
      <div class="flex gap-4 flex-col p-3 overflow-auto h-full ">
        <ArticleList articleList={articleList} refetch={refetch} />
      </div>
    </div>
  );
};

export default Article;

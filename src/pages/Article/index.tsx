import { fetch_articles } from "@lib/service/article";
import { useNavigate } from "@solidjs/router";

import { Component, createResource, createSignal } from "solid-js";
import BreadCrumb from "~/components/bare/common/BreadCrumb";
import ArticleDetails from "~/components/functional/article/ArticleDetails";
import ArticleList from "~/components/functional/article/ArticleList";
import { Button } from "~/components/ui/button";

const Article: Component = () => {
  const navigate = useNavigate();

  const [openDetails, setOpenDetails] = createSignal(false);
  const [activeArticle, setActiveArticle] = createSignal("");
  const [articleList, { refetch }] = createResource(fetch_articles);

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <BreadCrumb
        crumbs={[
          { href: "/app", label: "Home" },
          { href: "/app/article", label: "Article" },
        ]}
      />
      <div class="flex justify-between items-center p-3 ">
        <div class="text-2xl font-bold text-primary leading-10">Articles</div>
        <Button
          class="font-bold text-base"
          variant={"secondary"}
          size="lg"
          onClick={() => navigate("create")}
        >
          Create Article
        </Button>
      </div>
      <div class="flex gap-4 flex-col p-3 overflow-auto h-full ">
        <ArticleList
          articleList={articleList}
          refetch={refetch}
          openDetails={setOpenDetails}
          onView={(id: string) => {
            setActiveArticle(id);
          }}
        />
      </div>

      <ArticleDetails
        open={openDetails()}
        onOpenChange={setOpenDetails}
        articleId={activeArticle}
        refetchArticles={refetch}
      />
    </div>
  );
};

export default Article;

import { fetch_articles } from "@lib/service/article";

import { Component, createResource, createSignal } from "solid-js";
import ArticleDetails from "~/components/functional/article/ArticleDetails";
import ArticleList from "~/components/functional/article/ArticleList";
import { CreateArticleModal } from "~/components/functional/article/CreateArticle";
import { Button } from "~/components/ui/button";

export const route = {
  load: () => fetch_articles,
};
const Article: Component = () => {
  const [openModal, setOpenModal] = createSignal(false);
  const [openDetails, setOpenDetails] = createSignal(false);
  const [activeArticle, setActiveArticle] = createSignal("");

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden p-3 ">
      <div class="flex justify-between items-center p-3  ">
        <div class="text-2xl font-bold text-primary leading-10">Articles</div>

        <Button
          class="font-bold text-base"
          variant={"secondary"}
          size="lg"
          onClick={() => setOpenModal(true)}
        >
          Create Article
        </Button>
      </div>
      <div class="flex gap-4 flex-col p-3 overflow-auto h-full ">
        <ArticleList
          openDetails={setOpenDetails}
          onView={(id: string) => {
            setActiveArticle(id);
          }}
        />
      </div>
      <CreateArticleModal open={openModal()} onOpenChange={setOpenModal} />
      <ArticleDetails
        open={openDetails()}
        onOpenChange={setOpenDetails}
        articleId={activeArticle}
      />
    </div>
  );
};

export default Article;

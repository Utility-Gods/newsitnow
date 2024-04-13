import { fetch_articles } from "@lib/service/article";

import {
  Component,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import ArticleDetails from "~/components/functional/article/ArticleDetails";
import ArticleList from "~/components/functional/article/ArticleList";
import { CreateArticleModal } from "~/components/functional/article/CreateArticle";
import { Button } from "~/components/ui/button";

export const route = {
  load: () => fetch_articles,
};
const Article: Component = () => {
  const [list] = createResource(fetch_articles);

  const [openModal, setOpenModal] = createSignal(false);
  const [openDetails, setOpenDetails] = createSignal(false);
  const [activeArticle, setActiveArticle] = createSignal("");

  return (
    <div class="flex flex-col flex-1 flex-grow overflow-hidden">
      <div class="flex justify-between items-center p-6 ">
        <div class="text-2xl font-semibold leading-10">Articles</div>

        <Button
          class="font-bold text-base"
          size="lg"
          onClick={() => setOpenModal(true)}
        >
          Create Article
        </Button>
      </div>
      <div class="flex gap-6 flex-col p-6 overflow-auto h-full ">
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

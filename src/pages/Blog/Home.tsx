import { useNavigate } from "@solidjs/router";
import { Component } from "solid-js";
import CalloutJoin from "~/components/bare/common/CalloutJoin";

const BlogHome: Component = () => {
  const navigate = useNavigate();

  navigate("/blog/collection");

  return (
    <div class="w-full h-full p-6 flex gap-3 flex-col">
      <div class="text-xl font-semibold">Orange Gas Blog</div>

      <CalloutJoin />
    </div>
  );
};

export default BlogHome;

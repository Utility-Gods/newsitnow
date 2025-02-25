import { Component } from "solid-js";

const DHome: Component = () => {
  return (
    <div class="w-full  p-6 flex gap-3 flex-col">
      <div class="text-xl font-semibold">Documentation</div>

      <div class="text-lg mb-3">
        Explore the comprehensive guide to using the Orange Gas Platform
      </div>
      <p class="mb-4">
        The Orange Gas Platform is a state-of-the-art solution engineered to
        enhance the documentation process. Utilizing cutting-edge web
        technologies, it provides a seamless and effective approach to create,
        manage, and publish documentation. It's equipped with advanced features
        enabling users to craft detailed documents, tutorials, and support
        materials that are not only informative but also engaging and
        accessible.
      </p>
      <div class="flex flex-wrap gap-3">
        <span class="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
          Robust Platform
        </span>
        <span class="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
          High Efficiency
        </span>
        <span class="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
          Exceptional Usability
        </span>
        <span class="inline-block bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium">
          Innovative Features
        </span>
      </div>
    </div>
  );
};

export default DHome;

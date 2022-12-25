const CategoryTitle = ({ title, emoji }: { title: string; emoji: string }) => {
  return (
    <div className=" w-8/12 rounded-md border border-neutral-700 bg-neutral-800 px-4 py-4 text-neutral-200">
      <p>
        <span>{emoji}</span> {title}
      </p>
    </div>
  );
};

export default CategoryTitle;

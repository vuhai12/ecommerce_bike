const Section4 = ({ description }: { description: string | undefined }) => {
  return (
    <div className="flex gap-[32px] flex-col container mt-[50px]">
      <h3 className="font-semibold sm:text-[25px] text-[15px]">Overview</h3>

      <div
        className="
      text-[#475467]
      leading-7
      [&_h2]:text-[18px]
      [&_h2]:font-semibold
      [&_h2]:text-black
      [&_h2]:mb-4
      [&_h3]:text-[18px]
      [&_h3]:font-semibold
      [&_h3]:text-black
      [&_h3]:mt-6
      [&_h3]:mb-3
      [&_p]:text-[15px]
      [&_p]:leading-7
      [&_p]:mb-4
    "
        dangerouslySetInnerHTML={{ __html: description || "" }}
      />
    </div>
  );
};

export default Section4;

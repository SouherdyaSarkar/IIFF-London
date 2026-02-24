const FilmStrip = () => {
  return (
    <div className="relative w-full h-8 bg-primary flex items-center gap-4 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="w-6 h-6 bg-background/20 flex-shrink-0" />
      ))}
    </div>
  );
};

export default FilmStrip;

export const useFloatingLayout = () => {
  const generateLayout = (items, width) => {
    const rowHeight = 400;
    const paddingX = 100;

    return items.map((item, i) => {
      const row = Math.floor(i / 3); // 3 item per row

      const y = row * rowHeight + Math.random() * 80;

      const x = paddingX + Math.random() * (width - paddingX * 2);

      const size = 140 + Math.random() * 100;

      return {
        ...item,
        style: {
          position: "absolute",
          top: `${y}px`,
          left: `${x}px`,
          width: `${size}px`,
          transform: `translate(-50%, -50%) rotate(${Math.random() * 6 - 3}deg)`,
        },
      };
    });
  };

  return { generateLayout };
};

"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = "template.jpg";
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw image
      ctx.drawImage(image, 0, 0);

      // Configure text style
      ctx.fillStyle = "black";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 20; // increased for even bolder outline
      ctx.font = "bold 50px Impact"; // increased size and added bold
      ctx.textAlign = "center";

      // Draw top text
      if (topText) {
        ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 60); // <-- top text Y position is 60
        ctx.fillText(topText.toUpperCase(), 825, 250);
      }

      // Draw bottom text
      if (bottomText) {
        ctx.strokeText(
          bottomText.toUpperCase(),
          canvas.width / 2,
          canvas.height - 20
        ); // <-- bottom text Y position is canvas.height - 20
        ctx.fillText(bottomText.toUpperCase(), 825, 375);
      }

      // Draw logo
      if (logo) {
        const logoImage = new Image();
        logoImage.src = URL.createObjectURL(logo);
        logoImage.onload = () => {
          const logoSize = 200;
          ctx.drawImage(logoImage, 250, 600, logoSize, logoSize);
        };
      }
    };
  }, [topText, bottomText, logo]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "chill-guy-meme.png";
    link.href = url;
    link.click();
  };

  const handleRemoveLogo = () => {
    setLogo(null);
  };

  return (
    <main className="min-h-screen p-8 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Chill Guy 生成器</h1>
      <b />

      <canvas ref={canvasRef} className="max-w-lg" />

      <div className="flex flex-col gap-4 w-full max-w-lg">
        <input
          type="text"
          placeholder="Top text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
          className="p-2 border rounded text-black" // added text-black class
        />
        <input
          type="text"
          placeholder="Bottom text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
          className="p-2 border rounded text-black" // added text-black class
        />
        <label className="p-2 border rounded text-black">
          建築物 Logo
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
            className="p-2 border rounded text-black mt-2"
          />
        </label>
        {logo && (
          <button
            onClick={handleRemoveLogo}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete logo
          </button>
        )}
        <button
          onClick={handleDownload}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          下載 Meme
        </button>
        <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <a
            href="https://github.com/simonngai/chill-guy-generator"
            target="_blank"
          >
            Github Repo
          </a>
        </button>
      </div>
    </main>
  );
}

// components/MemeEditor.tsx
import React, { useRef, useState } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import { DndContext, useDraggable } from "@dnd-kit/core";

interface MemeEditorProps {
  imageUrl: string;
  onClose: () => void;
}

interface Position {
  x: number;
  y: number;
}

interface DraggableTextProps {
  id: string;
  children: React.ReactNode;
  position: Position;
}

const DraggableText: React.FC<DraggableTextProps> = ({ id, children, position }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style: React.CSSProperties = {
    position: "absolute",
    left: position.x,
    top: position.y,
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "none",
    cursor: "move",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

const MemeEditor: React.FC<MemeEditorProps> = ({ imageUrl, onClose }) => {
  const [text, setText] = useState<string>("Your meme text");
  const [textSize, setTextSize] = useState<number>(24);
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [textPosition, setTextPosition] = useState<Position>({ x: 50, y: 50 });

  const memeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!memeRef.current) return;

    const canvas = await html2canvas(memeRef.current);
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "meme.png";
    link.click();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg relative max-w-lg w-full">
              <button
          onClick={onClose}
          className="absolute top-1 right-1 text-white bg-red-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700"
        >
          ✕
        </button>


        {/* Meme Canvas */}
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden p-2 mt-5 mr-2" ref={memeRef}>
          <DndContext
            onDragEnd={(event) => {
              const { delta } = event;
              setTextPosition((prev) => ({
                x: prev.x + delta.x,
                y: prev.y + delta.y,
              }));
            }}
          >
            <Image
              src={imageUrl}
              alt="Meme"
              layout="fill"
              objectFit="cover"
              className="rounded-lg mr-4"
            />

            <DraggableText id="text-1" position={textPosition}>
              <p
                style={{
                  color: textColor,
                  fontSize: `${textSize}px`,
                  padding: "4px",
                  fontWeight: "bold",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  whiteSpace: "nowrap",
                }}
              >
                {text}
              </p>
            </DraggableText>
          </DndContext>
        </div>

        {/* Controls */}
        <div className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="Enter meme text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />

          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col">
              <label className="text-sm text-white">Font Size</label>
              <input
                type="number"
                min="10"
                max="100"
                value={textSize}
                onChange={(e) => setTextSize(Number(e.target.value))}
                className="w-20 p-1 text-white bg-gray-700 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-white">Text Color</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-10 h-9 rounded"
              />
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Download Meme
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemeEditor;

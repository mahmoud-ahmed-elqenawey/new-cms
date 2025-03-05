import { X } from "lucide-react";

interface ImageModalProps {
  imageUrl: string;
  alt: string;
  onClose: () => void;
}

export default function ImageModal({
  imageUrl,
  alt,
  onClose,
}: ImageModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 m-4 z-10">
          <button
            onClick={onClose}
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 p-2 rounded-full transition-colors group"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm shadow-2xl">
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-auto max-h-[85vh] object-contain"
          />

          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-4">
            <h3 className="text-white font-medium text-lg">{alt}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

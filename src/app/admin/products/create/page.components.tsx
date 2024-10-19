"use client";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Checkbox, IconButton } from "@mui/material";
import Image from "next/image";
import { ChangeEvent, DragEvent, MouseEvent, useRef, useState } from "react";
import styles from "./page.module.css";

const ProductImageLoader = () => {
  return (
    <div className="absolute top-0 left-0 flex justify-center items-center h-full w-full bg-inherit">
      <div className={styles["product-image-loader"]}></div>
    </div>
  );
};

export interface ProductImageProps {
  isCover: boolean;
  onProductCover: (event: MouseEvent<HTMLButtonElement>) => void;
  onRemove: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  src: string;
}

const ProductImage: React.FC<ProductImageProps> = ({
  isCover,
  onProductCover,
  onRemove,
  src,
}) => {
  /* Avoids flickering */
  const [cachedSrc] = useState<string>(src);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <div className="relative flex items-center h-[6.25rem] w-[6.25rem] rounded-lg bg-sky-50 overflow-hidden">
      {!imageLoaded && <ProductImageLoader />}
      <div className="absolute top-0 left-0 h-full w-full"></div>
      <Image
        className="w-full h-auto object-cover"
        src={cachedSrc}
        height="0"
        width="0"
        alt="Product image"
        onLoad={() => setImageLoaded(true)}
      />
      <Checkbox
        className="absolute top-1 left-1 p-0 rounded-[4px] bg-white hover:bg-white"
        disableRipple
        size="small"
        checked={isCover}
        onClick={onProductCover}
      />
      <IconButton
        className="absolute top-1 right-1 p-0 text-white bg-admin-error"
        disableRipple
        onClick={onRemove}
        size="small"
      >
        <CloseRoundedIcon sx={{ m: 0.25, fontSize: 16 }} />
      </IconButton>
    </div>
  );
};

export interface ImageFieldProps {
  InputProps: {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
  onDrop?: (event: DragEvent<HTMLDivElement>) => void;
}

const ImageField: React.FC<ImageFieldProps> = ({ onDrop, InputProps: { onChange } }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      /* Allows files to be dropped on the element */
      onDragOver={(e) => e.preventDefault()}
    >
      <div
        onClick={() => inputRef.current?.click()}
        /* Catches files */
        onDrop={(event) => {
          event.preventDefault();
          if (onDrop) onDrop(event);
        }}
        className="flex flex-col items-center p-8 md:px-20 border-2 border-dashed border-sky-100 rounded-[10px] bg-sky-50"
      >
        <p className="hidden font-semibold text-neutral-500 sm:block">
          Arrastra y suelta las imágenes de tu producto
        </p>
        <div className="hidden sm:flex sm:items-center sm:gap-4 sm:mt-4">
          <hr className="w-20" />
          <p className="font-light text-xs text-neutral-300">O</p>
          <hr className="w-20" />
        </div>
        <button className="my-8 py-1 px-6 border rounded-lg border-admin-active font-semibold text-sm text-admin-active transition-[background] duration-150 ease-out hover:bg-sky-100">
          Seleccionar Imagenes
        </button>
        <p className="text-xs text-neutral-400">Resolución minima 280x280.</p>
        <input
          ref={inputRef}
          accept="image/*"
          hidden
          multiple
          onChange={(e) => {
            onChange(e);
            /**
             * Avoids selecting same files between selections,
             * if the previous selection matches with the current selection.
             */
            e.target.value = "";
          }}
          type="file"
        />
      </div>
    </div>
  );
};

export { ImageField, ProductImage };

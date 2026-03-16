import { forwardRef, type ImgHTMLAttributes, useEffect, useState } from "react";

const FALLBACK_IMAGE_URL =
  "https://via.placeholder.com/800x600?text=Image+not+available";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  // Keep these props so existing usage doesn’t break, but we ignore them now
  originWidth?: number;
  originHeight?: number;
  focalPointX?: number;
  focalPointY?: number;
  fittingType?: "fill" | "fit";
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      originWidth,
      originHeight,
      focalPointX,
      focalPointY,
      fittingType = "fill",
      style,
      ...props
    },
    ref
  ) => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(src);

    useEffect(() => {
      setImgSrc(src);
    }, [src]);

    if (!imgSrc) {
      return (
        <div
          data-empty-image
          style={{ width: originWidth, height: originHeight, ...style }}
          {...props}
        />
      );
    }

    const objectFit = fittingType === "fit" ? "contain" : "cover";

    return (
      <img
        ref={ref}
        src={imgSrc}
        onError={() => setImgSrc(FALLBACK_IMAGE_URL)}
        style={{
          objectFit,
          width: originWidth ?? style?.width ?? "100%",
          height: originHeight ?? style?.height ?? "100%",
          ...style,
        }}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

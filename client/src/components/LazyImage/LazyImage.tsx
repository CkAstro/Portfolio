import { useEffect, useMemo, useRef, useState } from 'react';
import { api } from '@/api';
import { config } from '@/utils';
import styles from './LazyImage.module.scss';

interface SizeOptions {
   width: number;
   height: number;
   maxSize: number;
}

interface LazyImageProps {
   imageUri: string;
   sizes: SizeOptions[];
   altText?: string;
   rootMargin?: string;
   rootId?: string;
   fileExtension?: 'webp' | 'png';
}

export const LazyImage: React.FC<LazyImageProps> = ({
   imageUri,
   sizes,
   altText,
   rootMargin = '200px',
   rootId = config.containerId,
   fileExtension = 'webp',
}) => {
   const [imageSrc, setImageSrc] = useState('');
   const [isLoaded, setIsLoaded] = useState(false);
   const containerRef = useRef<HTMLDivElement>(null);

   const [width, height, responsiveUrl] = useMemo(() => {
      const deviceWidth = window.innerWidth;
      const sizeIndex = sizes.findIndex(({ maxSize }) => deviceWidth < maxSize);

      const { width, height } = sizes[sizeIndex === -1 ? sizes.length - 1 : sizeIndex];
      const url = `${api.baseUrl}/img/${imageUri}_${width}.${fileExtension}`;

      return [width, height, url];
   }, [imageUri, sizes, fileExtension]);

   useEffect(() => {
      const container = containerRef.current;
      const root = document.getElementById(rootId);
      if (container === null || root === null) return undefined;

      const observer = new IntersectionObserver(
         ([entry], obs) => {
            if (!entry.isIntersecting) return;

            // delay loading on scroll, etc
            if ('requestIdleCallback' in window)
               requestIdleCallback(() => setImageSrc(responsiveUrl));
            else setTimeout(() => setImageSrc(responsiveUrl), 0);

            obs.unobserve(entry.target);
         },
         {
            root,
            rootMargin,
         }
      );

      observer.observe(container);
      return () => {
         observer.disconnect();
      };
   }, [rootId, rootMargin, responsiveUrl]);

   return (
      <div
         ref={containerRef}
         style={{ width: `${width}px`, height: `${height}px` }}
         className={[styles.lazyImage__container, isLoaded ? styles.loaded : ''].join(' ')}
      >
         {imageSrc !== '' && (
            <img src={imageSrc} alt={altText} onLoad={(): void => setIsLoaded(true)} />
         )}
      </div>
   );
};

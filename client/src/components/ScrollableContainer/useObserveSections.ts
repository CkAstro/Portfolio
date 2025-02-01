import { useEffect, useMemo, useRef, useState } from 'react';

export type ValidChild = React.ReactElement<{ id: string }>;

export interface SectionInfo {
   visibleFraction: number;
   visibleLength: number;
}

export type OnVisibleSectionUpdate = (index: number, id: string) => void;
export type SectionSelector = (selections: SectionInfo[]) => number | null;

interface UseObserveSectionsArgs {
   threshold?: number[];
   sectionSelectorFn?: SectionSelector;
   onVisibleSectionUpdate?: OnVisibleSectionUpdate;
}

const DEFAULT_THRESHOLD = [0.01, 0.33, 0.66, 0.99];
const DEFAULT_SELECTION_FUNCTION: SectionSelector = (sections) => {
   for (let i = 0; i < sections.length; i++) {
      if (sections[i].visibleFraction > 0.01) return i;
   }
   return null;
};
const DEFAULT_ON_VISIBLE_SECTION_UPDATE: OnVisibleSectionUpdate = () => undefined;

type ContainerReference = React.RefObject<HTMLDivElement>;
type IdList = string[];
type VisibleSection = { index: number; id: string } | null;
type UseObserveSections = (
   children: ValidChild[],
   args?: UseObserveSectionsArgs
) => [ContainerReference, IdList, VisibleSection];

export const useObserveSections: UseObserveSections = (
   children,
   {
      threshold: thresholdProp = DEFAULT_THRESHOLD,
      sectionSelectorFn: sectionSelectorFnProp = DEFAULT_SELECTION_FUNCTION,
      onVisibleSectionUpdate: onVisibleSectionUpdateProp = DEFAULT_ON_VISIBLE_SECTION_UPDATE,
   } = {
      threshold: DEFAULT_THRESHOLD,
      sectionSelectorFn: DEFAULT_SELECTION_FUNCTION,
      onVisibleSectionUpdate: DEFAULT_ON_VISIBLE_SECTION_UPDATE,
   }
) => {
   const containerRef = useRef<HTMLDivElement>(null);
   const [visibleSection, setVisibleSection] = useState<VisibleSection>(null);
   const idList = useMemo(() => children.map(({ props: { id } }) => id), [children]);
   const sectionInfo = useRef<SectionInfo[]>(
      children.map(() => ({ visibleFraction: 0, visibleLength: 0 }))
   );

   const threshold = useRef(thresholdProp);
   useEffect(() => {
      threshold.current = thresholdProp;
   }, [thresholdProp]);

   const sectionSelectorFn = useRef(sectionSelectorFnProp);
   useEffect(() => {
      sectionSelectorFn.current = sectionSelectorFnProp;
   }, [sectionSelectorFnProp]);

   const onVisibleSectionUpdate = useRef(onVisibleSectionUpdateProp);
   useEffect(() => {
      onVisibleSectionUpdate.current = onVisibleSectionUpdateProp;
   }, [onVisibleSectionUpdateProp]);

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach(({ target, intersectionRatio }) => {
               if (!(target instanceof HTMLElement)) return;

               const idIndex = idList.findIndex((id) => id === target.id);
               if (idIndex === -1) return;

               sectionInfo.current[idIndex] = {
                  visibleFraction: intersectionRatio,
                  visibleLength: intersectionRatio * target.offsetHeight,
               };
            });

            const currentIndex = sectionSelectorFn.current(sectionInfo.current);
            setVisibleSection((prev) => {
               if (currentIndex === null) return null;

               const id = idList[currentIndex];
               if (currentIndex !== prev?.index) onVisibleSectionUpdate.current(currentIndex, id);
               return { index: currentIndex, id };
            });
         },
         { root: containerRef.current, threshold: threshold.current }
      );

      // add all children on idList update
      idList.forEach((id) => {
         const element = document.getElementById(id);
         if (element !== null) observer.observe(element);
      });

      return () => {
         observer.disconnect();
      };
   }, [idList]);

   return [containerRef, idList, visibleSection];
};

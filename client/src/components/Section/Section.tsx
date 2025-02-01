import styles from './Section.module.scss';

interface SectionProps {
   children: React.ReactNode;
   id: string;
   header: React.ReactNode;
   className?: string;
   style?: React.CSSProperties;
}

export const Section: React.FC<SectionProps> = ({
   children,
   id,
   header,
   className: classNameProp,
   style: styleProp,
}) => (
   <div id={id} className={[styles.section, classNameProp].join(' ')} style={styleProp}>
      {header}
      {children}
   </div>
);

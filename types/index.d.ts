type SelfOperation<T> = (current: T) => T;

/**Shorthand for standard React reference */
type Ref<T> = React.MutableRefObject<T>;

/**Shorthand for outdated React reference, only use for html elements */
type DivRef = React.RefObject<HTMLDivElement>;
type SvgRef = React.RefObject<SVGSVGElement>;

type FC = React.FC;

/**
 * A return handle for setTimeout( ) to allow cancellation.
 */
type TimeoutHandle = ReturnType<typeof setTimeout> | null;

/**
 * Exposed React component for use with React.forwardRef
 */
type ExposedComponent<T, P = {}> = React.ForwardRefExoticComponent<
   React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

/**
 * `FunctionalProp` allows for either a static or dynamic value.
 *
 * Example usage:
 * * const static: FunctionalProp<{isActive: boolean}, CSSProperties> = {top: 0}
 * * const dynamic: FunctionalProp<{isActive: boolean}, string>
 *    = isActive ? styles.active : styles.inactive
 */
type FunctionalProp<Args, Return> = Return | ((args: Args) => Return);

/**Element placement
 * @param top distance from parent element's top (measured downward)
 * @param left distance from parent element's left
 */
interface ElementPosition {
   top: number;
   left: number;
}

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
